
import os
import bpy

# 성별 설정
bpy.context.scene.mblab_character_name = 'm_as01'
bpy.context.scene.mblab_use_cycles = True

# 캐릭터 생성
bpy.ops.mbast.init_character()

# age, tone, masss 설정
bpy.context.object.character_age = 0.2
bpy.context.object.character_tone = 0.5
bpy.context.object.character_mass = 0.1

# Object 선택
bpy.ops.object.select_all(action='DESELECT')
bpy.data.objects[bpy.context.scene.mblab_character_name].select_set(True)

# 디렉토리 설정 및 obj 파일로 export
directory = r'C:\Users\SSAFY\Desktop\workspace\3d_blender_python\result'
target_file = os.path.join(directory, 'test.obj')
bpy.ops.export_scene.obj(filepath=target_file)
