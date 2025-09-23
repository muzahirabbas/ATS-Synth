import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from app.services.nlp_service import extract_keywords
from app.services.scoring_service import calculate_score, classify_keywords
from app.services.llm_service import get_ai_feedback
from app.utils import validate_request_data, extract_text_from_file, MIN_TEXT_LENGTH

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure CORS
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
CORS(app, resources={r"/api/*": {"origins": frontend_url}})


@app.route("/")
def index():
    return "CV-Synth Backend is running!"


@app.route("/api/analyze_resume", methods=["POST"])
def analyze_resume():
    """
    Analyzes the resume (from an uploaded file) against the job description.
    """
    is_valid, error_response = validate_request_data(request)
    if not is_valid:
        return error_response

    try:
        resume_file = request.files['resumeFile']
        jd_text = request.form.get("jobDescriptionText")
        
        # 1. Extract text from the uploaded resume file
        resume_text = extract_text_from_file(resume_file)
        if len(resume_text) < MIN_TEXT_LENGTH:
            return jsonify({"error": f"Could not extract sufficient text from the resume. Minimum {MIN_TEXT_LENGTH} characters required."}), 400

        # 2. Extract keywords from the job description
        jd_keywords = extract_keywords(jd_text)

        # 3. Compare resume against JD keywords
        found_keywords, missing_keywords = classify_keywords(resume_text, jd_keywords)

        # 4. Calculate the ATS match score
        score = calculate_score(len(found_keywords), len(jd_keywords))
        
        # 5. Get AI-powered feedback from Gemini
        ai_feedback = get_ai_feedback(resume_text, jd_text)
        
        if not ai_feedback:
             return jsonify({"error": "Failed to get feedback from AI service."}), 500

        # 6. Structure the final response
        response_data = {
            "score": score,
            "keywords": {
                "found": list(found_keywords),
                "partial": [],
                "missing": list(missing_keywords),
            },
            "feedback": ai_feedback
        }

        return jsonify(response_data), 200

    except (ValueError, IOError) as e:
        app.logger.error(f"File processing error: {e}")
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        app.logger.error(f"An internal server error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500


if __name__ == "__main__":
    app.run(debug=True)