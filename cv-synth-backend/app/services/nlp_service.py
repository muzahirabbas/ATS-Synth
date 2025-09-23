
import spacy

# Load the spaCy model once when the module is imported
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading spaCy model 'en_core_web_sm'...")
    from spacy.cli import download
    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def extract_keywords(text: str) -> set:
    """
    Extracts keywords (skills, technologies, qualifications) from a job description.
    Focuses on nouns, proper nouns, and compound phrases.
    """
    doc = nlp(text)
    keywords = set()
    
    # Extract noun chunks and proper nouns as potential keywords
    for chunk in doc.noun_chunks:
        keywords.add(chunk.text.lower().strip())
        
    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "WORK_OF_ART", "LANGUAGE"]:
             keywords.add(ent.text.lower().strip())

    # A simple list of common tech/business keywords to look for
    common_keywords = [
        "python", "java", "javascript", "c++", "c#", "ruby", "go", "swift", "typescript",
        "react", "angular", "vue", "node.js", "django", "flask", "spring",
        "sql", "nosql", "mysql", "postgresql", "mongodb", "redis",
        "aws", "azure", "gcp", "docker", "kubernetes", "terraform",
        "ci/cd", "jenkins", "gitlab", "github actions",
        "agile", "scrum", "kanban", "jira",
        "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
        "data analysis", "pandas", "numpy", "matplotlib",
        "project management", "product management", "ui/ux", "seo", "sem"
    ]

    # Add common keywords found in the text
    text_lower = text.lower()
    for keyword in common_keywords:
        if keyword in text_lower:
            keywords.add(keyword)

    # Clean up results
    # Remove very short or generic terms
    cleaned_keywords = {kw for kw in keywords if len(kw) > 1 and kw not in nlp.Defaults.stop_words}
    
    return cleaned_keywords
