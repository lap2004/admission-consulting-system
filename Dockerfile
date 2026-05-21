FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

# Install requirements
# Using --no-cache-dir to keep the image small
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Set up a new user named "user" with user ID 1000
# This is a requirement for Hugging Face Spaces Docker environments
RUN useradd -m -u 1000 user

# Switch to the "user" user
USER user

# Set home to the user's home directory
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

# Set the working directory to the user's home directory
WORKDIR $HOME/app

# Copy the current directory contents into the container at $HOME/app setting the owner to the user
COPY --chown=user . $HOME/app

# Expose port 7860 (default port for Hugging Face Spaces)
EXPOSE 7860

# Command to run the FastAPI application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
