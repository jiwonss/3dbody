import os
import subprocess
from flask import Flask, request

app = Flask(__name__)

@app.get("/")
def hello():
    return 'Hello, World!'

gender = {"male" : "m_as01", "female" : "f_as01"}

@app.route("/api/avatar", methods=["POST"])
def create_avatar():
    body = request.get_json()
    character_name = gender[body['gender']]
    age = body['age']
    mass = body['mass']
    tone = body['tone']
    
    blender_script = f"""
import os
import bpy

# 성별 설정
bpy.context.scene.mblab_character_name = '{character_name}'
bpy.context.scene.mblab_use_cycles = True

# 캐릭터 생성
bpy.ops.mbast.init_character()

# age, tone, masss 설정
bpy.context.object.character_age = {age}
bpy.context.object.character_tone = {mass}
bpy.context.object.character_mass = {tone}

# Object 선택
bpy.ops.object.select_all(action='DESELECT')
bpy.data.objects[bpy.context.scene.mblab_character_name].select_set(True)

# 디렉토리 설정 및 obj 파일로 export
directory = r'{os.getcwd()}\\result'
target_file = os.path.join(directory, 'test.obj')
bpy.ops.export_scene.obj(filepath=target_file)
"""
    
    # 스크립트 저장
    with open('blender_script.py', 'w', encoding='utf-8') as f:
            f.write(blender_script)

    # Blender 실행
    subprocess.run(['C:/Program Files/Blender Foundation/Blender 2.81/blender.exe', '-b', '-P', 'blender_script.py'])

    return "OK"

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)