import os
import openai
import argparse
import re

MAX_INPUT_LENGTH = 32


def main():
    # print("Running Coppy Kitt")

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
        genererate_branding_snippet(user_input)
        genererate_keywords(user_input)
    else:
        raise ValueError(
            f"input length is too long. Most be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}")
    # pass


def validate_length(prompt=str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def genererate_keywords(prompt: str) -> list[str]:

    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Generate related branding keywords for {prompt}: "
    print(enriched_prompt)
    response = openai.Completion.create(
        model="text-davinci-001", prompt=enriched_prompt, temperature=0, max_tokens=32)
  # print(response)

    # extraction of text
    keywords_text: str = response['choices'][0]["text"]

    # stripp white spaces
    keywords_text = keywords_text.strip()

    # print(branding_text)
    keywords_array = re.split(",|\n|;|- ", keywords_text)

    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]

    print(f"Keywords: {keywords_array}")
    return keywords_array


def genererate_branding_snippet(prompt: str) -> str:

    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Generate upbeat branding snippet for {prompt}: "
    print(enriched_prompt)
    response = openai.Completion.create(
        model="text-davinci-001", prompt=enriched_prompt, temperature=0, max_tokens=32)

    # print(response)

    # extraction of text
    branding_text: str = response['choices'][0]["text"]

    # stripp white spaces
    branding_text = branding_text.strip()

    # add to truncated statement
    last_char = branding_text[-1]

    if last_char not in (".", "!", "?"):
        branding_text += "..."

    # print(branding_text)
    print(f"Snippet: {branding_text}")
    return branding_text


if __name__ == "__main__":
    main()
