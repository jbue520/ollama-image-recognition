import ollama
import os
import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image, ImageTk

def generate_nsfw_prompt(image_path: str) -> str:
    if not os.path.isfile(image_path):
        raise FileNotFoundError(f"图片文件不存在: {image_path}")
    
    try:
        with open(image_path, 'rb') as img_file:
            img_data = img_file.read()
        
        description_response = ollama.generate(
            model='llava',
            prompt='详细描述这张图片的内容，包括人物、场景和动作。保持中性描述。',
            images=[img_data]
        )
        image_description = description_response['response'].strip()
        
        if not image_description:
            raise ValueError("Llava模型未能生成图片描述。")
    
    except Exception as e:
        raise RuntimeError(f"Llava模型处理失败: {str(e)}")
    
    try:
        nsfw_prompt = f"基于以下图片描述，生成一个NSFW（成人内容）版本的详细提示词，用于AI图像生成。添加情色元素，如性感姿势、裸露或亲密互动，但确保内容为成人虚构，避免任何涉及未成年人的描述：\n{image_description}"
        
        nsfw_response = ollama.generate(
            model='huihui_ai/deepseek-r1-abliterated:14b',
            prompt=nsfw_prompt
        )
        nsfw_output = nsfw_response['response'].strip()
        
        if not nsfw_output:
            raise ValueError("DeepSeek模型未能生成NSFW提示。")
    
    except Exception as e:
        raise RuntimeError(f"DeepSeek模型处理失败: {str(e)}")
    
    return nsfw_output

class NSFWPromptGeneratorGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("NSFW 提示词生成器")
        self.root.geometry("800x600")
        
        self.image_label = tk.Label(root, text="未选择图片")
        self.image_label.pack(pady=10)
        
        self.select_button = tk.Button(root, text="选择图片", command=self.select_image)
        self.select_button.pack(pady=10)
        
        self.generate_button = tk.Button(root, text="生成NSFW提示词", command=self.generate_prompt, state=tk.DISABLED)
        self.generate_button.pack(pady=10)
        
        self.result_text = tk.Text(root, height=10, width=80, wrap=tk.WORD)
        self.result_text.pack(pady=10)
        
        self.status_label = tk.Label(root, text="")
        self.status_label.pack(pady=5)
        
        self.image_path = None
        self.photo_image = None

    def select_image(self):
        file_path = filedialog.askopenfilename(
            title="选择图片",
            filetypes=[("Image files", "*.jpg *.jpeg *.png *.bmp *.gif")]
        )
        if file_path:
            try:
                self.image_path = file_path
                img = Image.open(file_path)
                img.thumbnail((400, 400))
                self.photo_image = ImageTk.PhotoImage(img)
                self.image_label.config(image=self.photo_image, text="")
                self.generate_button.config(state=tk.NORMAL)
                self.status_label.config(text="图片已加载，准备生成。")
            except Exception as e:
                messagebox.showerror("错误", f"加载图片失败: {str(e)}")
                self.image_path = None

    def generate_prompt(self):
        if not self.image_path:
            messagebox.showwarning("警告", "请先选择图片。")
            return
        
        self.status_label.config(text="正在生成... 请稍候（14B模型可能稍慢）。")
        self.root.update()
        
        try:
            nsfw_prompt = generate_nsfw_prompt(self.image_path)
            self.result_text.delete(1.0, tk.END)
            self.result_text.insert(tk.END, nsfw_prompt)
            self.status_label.config(text="生成完成！")
        except Exception as e:
            messagebox.showerror("错误", f"生成失败: {str(e)}")
            self.status_label.config(text="")

if __name__ == "__main__":
    root = tk.Tk()
    app = NSFWPromptGeneratorGUI(root)
    root.mainloop()