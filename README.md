# ATS-Synth: Your AI Career Co-pilot

**Analyze your resume against any job description, get an ATS-friendly score, and receive AI-powered feedback to land your next interview.**

-----

## 🚀 About The Project

In today's competitive job market, tailoring your resume for every application is crucial but incredibly time-consuming. Many applicants send their resumes into a "black hole," never knowing why they were rejected. CV-Synth was built to solve this problem.

This intelligent career co-pilot acts as your personal recruitment expert. It analyzes your resume against a target job description, providing instant, data-driven insights. It helps you optimize your resume, beat the Applicant Tracking Systems (ATS), and confidently showcase your qualifications.

### Impact and Uses

  * **For Job Seekers:** Instantly identify missing keywords, strengthen your bullet points with quantifiable metrics, and significantly increase your chances of passing the initial screening.
  * **For Career Coaches:** A powerful tool to help clients rapidly tailor their resumes for multiple roles, providing tangible, AI-backed advice.
  * **For Students:** Prepare for internships and first jobs by learning how to align academic projects and skills with real-world job requirements.

-----

## ✨ Features

  * **📄 PDF & DOCX Resume Parsing:** Simply upload your resume in a standard format—no more tedious copy-pasting.
  * **📊 ATS Match Score:** A dynamic gauge provides an immediate percentage score on how well your resume matches the job description.
  * **🔑 Keyword & Skill Analysis:** See a clear breakdown of keywords and skills that are **Found** in your resume and those that are critically **Missing**.
  * **🤖 AI-Powered Feedback:** Powered by the Google Gemini API, receive expert coaching on your resume's strengths, areas for improvement, and specific, actionable suggestions.
  * **📱 Modern & Responsive UI:** A clean, professional, and fully responsive interface built with React and Tailwind CSS.
  * **⚡ Frictionless Experience:** No sign-up required. Get immediate value from the moment you land on the page.

-----

## 🛠️ Tech Stack

| Area       | Technology                                                              |
| :--------- | :---------------------------------------------------------------------- |
| **Frontend** | React, Vite, Tailwind CSS, Zustand, Framer Motion                       |
| **Backend** | Flask (Python), spaCy, Google Gemini Pro API                            |
| **Parsing** | `pdfplumber` for PDFs, `python-docx` for DOCX files                     |
| **Deployment**| Docker, **Google Cloud Run** (Backend), **Cloudflare Pages** (Frontend) |

-----

## ⚙️ Getting Started: Running Locally

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

  * Node.js (v18+) & npm
  * Python (v3.9+) & pip
  * Git for version control
  * A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1\. Backend Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd cv-synth/cv-synth-backend

# 2. Create and activate a virtual environment
# On Windows
python -m venv venv
.\venv\Scripts\activate
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# 3. Install all dependencies from the requirements file
pip install -r requirements.txt

# 4. Download the spaCy NLP model
python -m spacy download en_core_web_sm

# 5. Create the environment file
# Copy the example to a new .env file
cp .env.example .env

# 6. Add your API key and settings to the .env file
# Open .env and add your key
GEMINI_API_KEY="YOUR_API_KEY_HERE"
FRONTEND_URL="http://localhost:5173"
FLASK_APP="app.main:app"
FLASK_DEBUG=1

# 7. Run the backend server (leave this terminal running)
flask run --port 8080
```

### 2\. Frontend Setup

```bash
# 1. Open a new terminal and navigate to the frontend directory
cd cv-synth/frontend

# 2. Install npm packages
npm install

# 3. Create the environment file for the frontend
cp .env.example .env

# 4. Ensure the .env file points to your local backend
# The default value should be correct
VITE_API_BASE_URL="http://localhost:8080"

# 5. Run the frontend dev server
npm run dev
```

Your application should now be running at **http://localhost:5173**\!

-----

## 🚢 Deployment for Free

You can deploy this entire stack for free using the generous always-free tiers of Google Cloud Run and Cloudflare Pages.

### Backend on Google Cloud Run (Free Tier)

Google Cloud Run's free tier includes **2 million requests per month** and a monthly quota of vCPU-seconds and GiB-seconds, which is more than enough for a portfolio project. We'll deploy it to be as cost-effective as possible.

**Prerequisites:**

  * A Google Cloud account with billing enabled (you won't be charged if you stay within the free tier).
  * [Google Cloud SDK (`gcloud`)](https://www.google.com/search?q=%5Bhttps://cloud.google.com/sdk/docs/install%5D\(https://cloud.google.com/sdk/docs/install\)) and Docker installed.

**Steps:**

1.  **Enable APIs & Authenticate Docker:**
    ```bash
    gcloud services enable run.googleapis.com artifactregistry.googleapis.com
    gcloud auth configure-docker us-central1-docker.pkg.dev
    ```
2.  **Build and Push the Docker Image:**
    *(Navigate to the `cv-synth-backend` directory first. Replace `YOUR_PROJECT_ID` with your GCP Project ID.)*
    ```bash
    export IMAGE_TAG=us-central1-docker.pkg.dev/YOUR_PROJECT_ID/cv-synth-repo/cv-synth-backend:latest
    docker build -t $IMAGE_TAG .
    docker push $IMAGE_TAG
    ```
3.  **Deploy to Cloud Run (Free-Tier Friendly):**
      * First, store your API key securely in Secret Manager:
        ```bash
        gcloud secrets create gemini-api-key --replication-policy="automatic"
        echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets versions add gemini-api-key --data-file=-
        ```
      * Now, deploy the service. The `--min-instances=0` flag is key to staying in the free tier, as it allows the service to scale down to zero when not in use.
        ```bash
        gcloud run deploy cv-synth-backend \
          --image=$IMAGE_TAG \
          --platform=managed \
          --region=us-central1 \
          --allow-unauthenticated \
          --memory=512Mi \
          --cpu=1 \
          --min-instances=0 \
          --set-secrets="GEMINI_API_KEY=gemini-api-key:latest"
        ```
4.  **Note the Service URL:** After deployment, `gcloud` will give you a **Service URL**. Copy this URL for the next step.

### Frontend on Cloudflare Pages (Free Tier)

1.  **Push to GitHub:** Make sure your entire project is pushed to a GitHub repository.
2.  **Create Cloudflare Project:**
      * Log in to Cloudflare -\> **Workers & Pages** -\> **Create application** -\> **Pages**.
      * Connect to your GitHub account and select your `cv-synth` repository.
3.  **Configure Build Settings:**
      * **Project name:** `cv-synth`
      * **Production branch:** `main`
      * **Framework preset:** `Vite`
      * **Root Directory (Advanced):** Set this to `frontend`. This is very important\!
4.  **Set Environment Variables:**
      * Go to **Settings** -\> **Environment Variables**.
      * Add a variable for **Production**:
          * **Variable name:** `VITE_API_BASE_URL`
          * **Value:** Paste the **Service URL** you got from Google Cloud Run.
5.  **Deploy:** Click **Save and Deploy**. Cloudflare will build and host your site on its global network.
6.  **Final Step (CORS):** Go back to your Cloud Run service, click "Edit & Deploy New Revision", go to the "Variables & Secrets" tab, and add an environment variable `FRONTEND_URL` with your new Cloudflare Pages URL (e.g., `https://cv-synth.pages.dev`). This ensures your backend only accepts requests from your frontend.
