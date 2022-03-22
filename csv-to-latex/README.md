# About

This is a prototype LaTeX document generator. By extracting questions, responses, and topics from the application database as CSV files, you can use this application to generate a report for a client. Simply verify that the names of the files extracted from the application database match those currently in the database, and drop them into the same directory as the Python script. Be sure to remove the first line of the CSV that names its fields, if such a line exists. 

The script can then be execute with the following:

`python3 main.py`

The script will output a file based on `template.tex` called `output.tex`. This file can be compiled on Overleaf, or on desktop if you are adventurous enough to resolve various packaging issues. Be sure to upload the CEROC logo into your Overleaf project. 

If you wish to modify the document template, make your changes to `template.tex` and be sure to leave it in the same directory as the Python script. 
