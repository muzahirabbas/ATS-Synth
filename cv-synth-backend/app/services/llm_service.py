
import os
import google.generativeai as genai
import json

def get_ai_feedback(resume_text: str, jd_text: str) -> dict:
    """
    Generates structured feedback for a resume based on a job description
    using the Gemini API.

    Args:
        resume_text: The text of the user's resume.
        jd_text: The text of the target job description.

    Returns:
        A dictionary containing strengths, improvements, and suggestions,
        or None if an error occurs.
    """
    try:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable not set.")
            
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-pro')

        prompt = f"""
        Act as an expert career coach and resume writer reviewing a resume for a specific job.
        Your task is to provide clear, actionable feedback to help the user improve their resume.
        Analyze the provided resume text against the provided job description text.

        **Resume Text:**
        ---
        {resume_text}
        ---

        **Job Description Text:**
        ---
        {jd_text}
        ---

        Based on your analysis, provide feedback in a structured JSON format. The JSON object should have three keys: "strengths", "improvements", and "suggestions".
        - "strengths": A string briefly summarizing what the resume does well in relation to the job description.
        - "improvements": A string identifying key areas for improvement, such as missing skills, vague language, or lack of quantifiable results.
        - "suggestions": An array of strings, where each string is a specific, actionable suggestion. For example, suggest rephrasing a bullet point to include metrics or adding a missing skill.

        **IMPORTANT**: Your entire response MUST be a single, valid JSON object and nothing else. Do not include any text before or after the JSON object.

        Example JSON output format:
        {{
          "strengths": "The resume clearly highlights relevant experience in project management and Python development.",
          "improvements": "The project descriptions lack quantifiable metrics, making it hard to gauge the impact of your work. Several key skills from the job description like 'AWS' and 'SQL' are missing.",
          "suggestions": [
            "Rewrite 'Managed a team' to 'Led a team of 5 engineers to deliver the product-relaunch project 2 weeks ahead of schedule, increasing user engagement by 15%.'",
            "Add a 'Technical Skills' section that explicitly lists 'SQL', 'AWS', and 'Agile Methodology' to better align with the job requirements."
          ]
        }}
        """

        response = model.generate_content(prompt)
        
        # Clean the response to ensure it's valid JSON
        cleaned_response_text = response.text.strip().replace("```json", "").replace("```", "").strip()
        
        feedback_json = json.loads(cleaned_response_text)
        
        return feedback_json

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None
