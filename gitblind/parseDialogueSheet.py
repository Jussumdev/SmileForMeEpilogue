
import io

inputPath = 'DialogueSheet - Dialogue.csv';
prefixPath = 'emailDataPrefix.js';
outputPath = '../js/data/emailData.js';

#returns the contexts of a file
def getContents(f):
    inputfile = open(f, 'r') # Create a file object in read-only mode.
    content = inputfile.read()
    inputfile.close() # Close the file.
    return content

#writes the contents to a file
def writeContents(f, contents):
    with io.open(f, 'w+', encoding='utf8') as outfile:
        outfile.write(contents)
        outfile.close()

def splitCustom(f):
    return f.split(',%%%,')

def safeQuote(text):
    return text[1:-1].replace("'", "\\'").replace('"', '\\"')

def main(compact):
    content = getContents(inputPath)
    lines = content.splitlines()[1:]

    funcs = "";
    for line in lines:
        sp = splitCustom(line)
        if (sp[0]==''):
            break
        name = sp[0]
        text = sp[1]
        event = sp[2]
        randomize = sp[3]
        attachments = sp[4].rstrip(',').split(',') if (sp[4]!=',') else '[]';

        nt = '\n\t' if compact else '';
        n = '\n' if compact else '';

        func = ("email("+nt+
        "'"+name+"',"+nt+
        "'"+safeQuote(text)+"',"+nt+
        ""+str(attachments)+","+nt+
        ""+str(randomize)+","+nt+
        ""+str(event)+n+
        ");"+n*2)

        funcs+=func;

    print(funcs)

    prefix = getContents(prefixPath)

    writeContents(
        outputPath,
        prefix + funcs
    );

if __name__ == "__main__":
    # main(True)
    main(False)
