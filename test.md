## UI tests
- '5' '=':                  top = '5' bottom = ''
- '5' '+':                  top = '5 +' bottom = ''
- '5' '+' '4' '=':          top = '9' bottom = ''
- '5' '+' '4' '=' '+' :     top = '9+' bottom = ''
- '5' '+' '4' '*':          top = '9 *' bottom = ''
- '5' '+' '4' '*' '3':      top = '9 *' bottom = '3'
- '5' '+' '4' '*' '3' '=':  top = '27' bottom = ''
- '5' '+' '4' '*' '+':      top = '9 +' bottom = ''