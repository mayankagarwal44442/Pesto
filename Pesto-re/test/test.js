
const express = require("express");
var app = express();
const fetch = require("node-fetch");


const expect = require('chai').expect;
const assert = require('chai').assert;




describe('admin Test', () => {

    function validate_email(email)
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validate_password(pass)
    {
        var re = /[0-9a-f]*/i;
        return re.test(pass);
    }

    function check_user_admin_response(obj)
    {
        describe('_id test', () => {
            it("should return _id which is a string", async() => {
                if(typeof obj["_id"] != "string")               //takes care even if missing
                assert.fail("object id missing or in wrong format")
            });
        });

        describe('name test', () => {
            it("should return name which is a string", async() => {
                if(typeof obj["name"] != "string")               //takes care even if missing
                assert.fail("object name missing or in wrong format")
            });
        });

        describe('email test', () => {
            it("should return valid email", async() => {
                if(!validate_email(obj["email"]))               //takes care even if missing
                assert.fail("object email missing or in wrong format")
            });
        });

        describe('password test', () => {
            it("should return valid password hash", async() => {
                if(!validate_password(obj["password"]))               //takes care even if missing
                assert.fail("object password missing or in wrong format")
            });
        });

        describe('address test', () => {
            it("should return valid address", async() => {
                if(typeof obj["address"] != "string")               //takes care even if missing
                assert.fail("object name missing or in wrong format")
            });
        });

        describe('date test', () => {
            it("should returnvalid date", async() => {
                if(typeof obj["date"] != "string")               //takes care even if missing
                assert.fail("object name missing or in wrong format")
            });
        });

    }


    it('should return all users with correct attributes', async () => {
        let response = await fetch("http://localhost:5000/api/v1/admin/User-Admin");
        if (response.ok) 
        { // if HTTP-status is 200-299
            let obj = await response.json();
            for(var x in obj)
                check_user_admin_response(obj[x]);
        } 
        else 
        {
            assert.fail("get request didnt work")
        }
    });

});

describe('pesto Test', () => {


    function validate_post(obj)
    {
        for(var x in obj)
        {
            if(obj[x] != '0' && obj[x] != '1')
                return false;
        }
        return true;
    }

    function check_pesto_response(obj)
    {
        describe('_id test', () => {
            it("should return _id which is a string", async() => {
                if(typeof obj["_id"] != "string")               //takes care even if missing
                assert.fail("object id missing or in wrong format")
            });
        });

        describe('posted by test', () => {
            it("should return posted by which is a string", async() => {
                if(typeof obj["posted_by"] != "string")               //takes care even if missing
                assert.fail("object name missing or in wrong format")
            });
        });

        describe('timestamp test', () => {
            it("should return valid timestamp", async() => {
                if(typeof obj["timestamp"] != "string")               //takes care even if missing
                assert.fail("object name missing or in wrong format")
            });
        });

        describe('post test', () => {
            it("should return valid post hash", async() => {
                if(!validate_post(obj["post"]))               //takes care even if missing
                assert.fail("object password missing or in wrong format")
            });
        });


    }


    it('should return all pestos with correct attributes', async () => {
        let response = await fetch("http://localhost:5000/api/v1/pestos/display");
        if (response.ok) 
        { // if HTTP-status is 200-299
            let obj = await response.json();
            for(var x in obj)
                check_pesto_response(obj[x]);
        } 
        else 
        {
            assert.fail("get request didnt work")
        }
    });

});


describe('create_pesto Test', () => {

    function calc_frequency(s)
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
    
    function sort_on_freqs(frequencies)
    {
        let letters = [];
        for(let c in frequencies)
            letters.push([frequencies[c], c]);
        return letters.sort();
    }
    
    function buildtree(letters){
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
    
    function remove_frequencies(tree)
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
    

    it('should sucessfully create pesto', async () => {

        let opts = {
            pestoid : 3,
            post: "me!",
            postHash: remove_frequencies(buildtree(sort_on_freqs(calc_frequency("me!")))),
            posted_by: "john_doe",
            timestamp : Date(),
            visible : "all"
        }
        // console.log(opts)

        let response = await fetch("http://localhost:5000/api/v1/pestos/post", 
        {
            method: 'POST',
            body: opts
        });
        if (!response.ok) 
        {
            // console.log(response.status)
            assert.fail("post request didnt work")
        }
    });

});


describe('delete_pesto Test', () => {

    it('should sucessfully delete pesto', async () => {

        let opts = {
            pestoid : 3,
        }
        // console.log(opts)

        let response = await fetch("http://localhost:5000/api/v1/pestos/remove", 
        {
            method: 'Delete',
            body: opts
        });
        if (!response.ok) 
        {
            // console.log(response.status)
            assert.fail("delete request didnt work")
        }
    });

});