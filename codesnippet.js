const tagColors = { 
                    "#":"#6a9942",
                    "'":"#ce9178",
                    "\"":"#ce9178",
                    "//":"#6a9942",
                    "if":"#c586c0",
                    "else":"#c586c0",
                    "{":"#c586c0",
                    "}":"#c586c0",
                    "false":"#569cd6",
                    "False":"#569cd6",
                    "true":"#569cd6",
                    "True":"#569cd6",
                    "(":"#569cd6",
                    ")":"#569cd6",
                    "function":"#569cd6",
                    "def":"#569cd6",
                    "while":"#569cd6",
                    "then":"#569cd6",
                    "for":"#569cd6",
                    "let":"#569cd6",
                    "from":"#569cd6",
                    "import":"#569cd6",
                    "width":"#569cd6"
                };

const preBackground = "#333333";
const txtColor = "#9cdcfe"

function colorIt(text)
{
    let active = false;
    let end = false;
    let output = "";
    let endNumber = 0;

    for(let char=0; char < text.length; char++)
    {
        end = false;
        
        if(text[char]=="#" && active==false)
        {
            output += "<span style='color:" + tagColors[text[char]] + "'>";
            active = true
        }

        if(text[char]=="/" && text[char+1]=="/" && active==false)
        {
            output += "<span style='color:" + tagColors["#"] + "'>";
            active = true
        }

        if(active == true && text[char]=="\n")
        {
            end = true;
        }
        
        if(text[char]=="'" || text[char]=="\"")
        {
            if(active==false)
            {
                output += "<span style='color:" + tagColors[text[char]] + "'>";
                active = true;
            }else{
                end = true;
            }
        }

        if(active==false)
        {
            for(let key in tagColors){
                let scan = "";
                for(let i=0; i < key.length; i++)
                {
                    scan += text[char + i];
                }

                if(scan==key)
                {
                    endNumber = char + key.length;
                    output += "<span style='color:" + tagColors[key] + "'>";
                }
            }
        }

        if(text[char]=="(" && active==false || text[char]==")" && active==false)
        {
            output += "<span style='color:" + tagColors[text[char]] + "'>";
            end = true
        }

        output += text[char];

        if(char==endNumber-1 && active==false)
        {
            console.log(endNumber);
            endNumber = 0;
            output += "</span>";
        }

        if(end == true)
        {
            output += "</span>";
            active = false;    
        }
    }
    return output
}

function codePre()
{
    let el = document.getElementsByClassName("codePre");
    for(let i=0; i < el.length; i++)
    {
        let newtext = colorIt(el[i].innerHTML);
    
        el[i].style.color = txtColor;    
        el[i].style.background = preBackground;
        el[i].innerHTML = newtext;    
    }    
}
