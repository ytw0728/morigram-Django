from django import forms

"""
class AddMemberForm(forms.Form):
    name = forms.CharField(label='이름을 입력해 주세요')
    position = forms.CharField('가족 내 위치를 입력해 주세요 ex) 딸, 아들, 아빠, 엄마')
    profile_image = forms.FileField(label='프로필 사진을 설정해 보세요!')

    
    def __init__(self, *args, **kwargs):
        super(AddMemberForm, self).__init__(*args, **kwargs)
        self.fields['name'].widget.attrs['class'] = 'my_class'
    """