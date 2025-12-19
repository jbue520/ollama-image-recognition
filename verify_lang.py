import requests
from PIL import Image
import io

def verify():
    img = Image.new('RGB', (100, 100), color = 'red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    url = 'http://127.0.0.1:9541/generate'
    files = {'image': ('test.png', img_byte_arr, 'image/png')}
    data = {
        'language': 'cn',
        'keywords': 'cat',
        'model': 'huihui_ai/deepseek-r1-abliterated:14b' 
    }
    
    print("Sending request...")
    try:
        response = requests.post(url, files=files, data=data)
        if response.status_code == 200:
            result = response.json()
            print("Response:", result)
            prompt = result.get('prompt', '')
            if any(u'\u4e00' <= c <= u'\u9fff' for c in prompt):
                print("SUCCESS: Chinese characters detected.")
            else:
                print("FAILURE: No Chinese characters found.")
        else:
            print(f"Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Connection failed: {e}")

def verify_text_only():
    print("\n--- Verifying Text-Only Mode ---")
    url = 'http://127.0.0.1:9541/generate'
    data = {
        'language': 'en',
        'keywords': 'A beautiful sunset over a cybernetic city',
        'model': 'huihui_ai/deepseek-r1-abliterated:14b',
        'sequence_count': 1
    }
    
    print("Sending text-only request...")
    try:
        response = requests.post(url, data=data)
        if response.status_code == 200:
            result = response.json()
            prompt = result.get('prompt', '')
            print("Response Length:", len(prompt))
            if len(prompt) > 50:
                 print("SUCCESS: Text-only prompt generated.")
            else:
                 print("FAILURE: Prompt too short.")
        else:
             print(f"Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    verify()
    verify_text_only()
