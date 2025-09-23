
# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /code

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy model
RUN python -m spacy download en_core_web_sm

# Copy the content of the local src directory to the working directory
COPY ./app /code/app

# Specify the command to run on container start
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app.main:app"]
