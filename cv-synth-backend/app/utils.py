from flask import jsonify, current_app
import pdfplumber
import docx
import os

MIN_TEXT_LENGTH = 50
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_file(file):
    """Extracts text from an uploaded .pdf or .docx file."""
    if not file or not file.filename:
        raise ValueError("Invalid file provided.")

    filename = file.filename
    if not allowed_file(filename):
        raise ValueError("File type not allowed. Please upload a .pdf or .docx file.")
    
    text = ""
    try:
        if filename.lower().endswith('.pdf'):
            with pdfplumber.open(file) as pdf:
                for page in pdf.pages:
                    text += page.extract_text() or ""
        elif filename.lower().endswith('.docx'):
            doc = docx.Document(file)
            for para in doc.paragraphs:
                text += para.text + "\n"
    except Exception as e:
        current_app.logger.error(f"Error parsing file {filename}: {e}")
        raise IOError(f"Could not read or parse the file: {filename}")

    return text


def validate_request_data(request) -> tuple[bool, tuple[dict, int] or None]:
    """Validates the incoming multipart/form-data request."""
    if 'resumeFile' not in request.files:
        return False, (jsonify({"error": "No 'resumeFile' part in the request."}), 400)
    
    file = request.files['resumeFile']
    if file.filename == '':
        return False, (jsonify({"error": "No file selected."}), 400)
        
    if not allowed_file(file.filename):
         return False, (jsonify({"error": "Invalid file type. Only .pdf and .docx are allowed."}), 400)

    jd_text = request.form.get("jobDescriptionText")
    if not jd_text or len(jd_text) < MIN_TEXT_LENGTH:
        return False, (jsonify({"error": f"Job description must be at least {MIN_TEXT_LENGTH} characters long."}), 400)

    return True, None