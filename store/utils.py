import os

def get_image_path(instance, filename):
    # Get the model's class name (e.g., "Laptop" or "Graphics_Card")
    category = instance.__class__.__name__.lower()

    # Get the model's name
    model_name = instance.name.lower().replace(" ", "_")  # Replace spaces with underscores

    # Define the path where the image will be saved
    path = f"{category}/{model_name}/"

    # Create the directory if it doesn't exist
    full_path = os.path.join("media", path)
    os.makedirs(full_path, exist_ok=True)

    # Return the full path including the filename, using / as the separator
    return os.path.join(path, filename).replace("\\", "/")
