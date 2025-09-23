
import re

def calculate_score(found_keywords_count: int, total_keywords_count: int) -> int:
    """
    Calculates the ATS match score based on the ratio of found keywords.
    """
    if total_keywords_count == 0:
        return 0
    
    score = int((found_keywords_count / total_keywords_count) * 100)
    return min(score, 100) # Ensure score doesn't exceed 100

def classify_keywords(resume_text: str, jd_keywords: set) -> tuple[set, set]:
    """
    Compares resume text against job description keywords to classify them
    as found or missing.
    """
    resume_lower = resume_text.lower()
    found_keywords = set()
    
    for keyword in jd_keywords:
        # Use regex with word boundaries to avoid partial matches (e.g., 'art' in 'chart')
        pattern = r'\b' + re.escape(keyword) + r'\b'
        if re.search(pattern, resume_lower):
            found_keywords.add(keyword)
            
    missing_keywords = jd_keywords - found_keywords
    
    return found_keywords, missing_keywords
