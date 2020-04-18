export function calc_frequency(s)
{
	let frequencies = {};
	for(let i = 0; i < s.length; ++i)
	{
		if(s[i] in frequencies)
			frequencies[s[i]] += 1;
		else
			frequencies[s[i]] = 1;
	}	
	return frequencies;
}

export function sort_on_freqs(frequencies)
{
	let letters = [];
	for(let c in frequencies)
		letters.push([frequencies[c], c]);
	return letters.sort();
}

export function buildtree(letters){
    while(letters.length >= 2)
    {
        let least_two = letters.slice(0,2);
       	let rest = letters.slice(2,letters.length);
        let total_freq = letters[0][0] + letters[1][0];
        letters = rest;

        let comb = [total_freq,least_two];
        letters.push(comb);

        letters.sort();
	}
	if(letters.length == 0) return [];
    return letters[0];	//root
}

export function remove_frequencies(tree)
{
	if(tree.length == 0) return tree;
    var p = tree[1];
    if (typeof p === 'string')
    {
        return p;
	}
    else
	{
        return (Array(remove_frequencies(p[0]),remove_frequencies(p[1])));
	}
}

let codes = {};
export function assign_codes(node, code)
{
	if (typeof(node) == 'string')
   	{
   		codes[node] = code;
 	}
    else 
	{
    	assign_codes(node[0], code + "0");
    	assign_codes(node[1], code + "1");
	}
 }

 export function encode(tree, s){
 	if(tree.length == 0) return "";
 	assign_codes(tree, "")
    let encoded_output = "";
    for (let i = 0;i < s.length; ++i)
    {
        encoded_output = encoded_output + codes[s[i]];
    }
    return encoded_output;
}

export function decode(tree, s)
{
    //console.log(tree);
    //console.log("s",s);
    if(tree.length == 0) return "";
    if(s.length == 0) return "";
	let decoded_output = "";
    let t = tree;
 	for (var bit in s)
    {
    	if (s[bit] == '0')
        {  
        	t = t[0];
        }
     	else
        { 
        	t = t[1];
        }
     	if (typeof(t) == 'string')
        {
        	decoded_output += t;
         	t = tree;
         }
     }
 return decoded_output;
}