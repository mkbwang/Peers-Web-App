from setuptools import setup

setup(
    name='peers',
    version='0.1.0',
    packages=['peers'],
    include_package_data=True,
    install_requires=[
        'Flask',
        'html5validator',
        'pycodestyle',
        'pydocstyle',
        'pylint',
        'nodeenv',
        'sh',
        'Flask-Testing',
        'selenium',
        'requests',
        'arrow',
        'pandas',
        'numpy',
        'lifelines',
        'matplotlib'
    ],
)
