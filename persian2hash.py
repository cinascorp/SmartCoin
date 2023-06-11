import hazm
import hashlib

# Get input from the user
article = input("Enter your article: ")

# Pre-process the article to remove specific values, numbers, and digits
normalizer = hazm.Normalizer()
article = normalizer.normalize(article)  # remove specific characters or parenthesis

# Tokenize and split the article into words
tokenizer = hazm.word_tokenize(article)
article_words = [word.lower() for word in tokenizer if not word.isdigit()]

# Combine words to form a single string and convert to bytes
article_string = ' '.join(article_words)
article_bytes = article_string.encode('utf-8')

# Hash the article using SHA-256
sha256_hash = hashlib.sha256(article_bytes).hexdigest()

# Print the generated hash value
print("Hash value of the article: ", sha256_hash)
