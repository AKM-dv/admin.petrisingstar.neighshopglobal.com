import os
directory_path = '\New folder'
contents=os.listdir(directory_path)
for item in contents:
    print(item)