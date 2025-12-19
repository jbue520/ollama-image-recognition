import os
import urllib.request

ASSETS = [
    ("https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js", "static/lib/particles/particles.min.js"),
    
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css", "static/lib/fontawesome/css/all.min.css"),
    
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.woff2", "static/lib/fontawesome/webfonts/fa-solid-900.woff2"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-regular-400.woff2", "static/lib/fontawesome/webfonts/fa-regular-400.woff2"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.woff2", "static/lib/fontawesome/webfonts/fa-brands-400.woff2"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-solid-900.ttf", "static/lib/fontawesome/webfonts/fa-solid-900.ttf"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-regular-400.ttf", "static/lib/fontawesome/webfonts/fa-regular-400.ttf"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/webfonts/fa-brands-400.ttf", "static/lib/fontawesome/webfonts/fa-brands-400.ttf")
]

def download_assets():
    print("Starting download of assets...")
    for url, path in ASSETS:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        print(f"Downloading {url} -> {path}...")
        try:
            req = urllib.request.Request(
                url, 
                data=None, 
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            )
            
            with urllib.request.urlopen(req, timeout=10) as response, open(path, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
                print("  Success")
        except Exception as e:
            print(f"  FAILED: {e}")

if __name__ == "__main__":
    download_assets()
