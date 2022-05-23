import { readFileSync } from 'fs';


const env = process.env.ENV
require('dotenv').config({ path: "./env/.staging.env" + env })

export const CONFIG_FILE = 'config.json';
export const CONFIG = () => JSON.parse(readFileSync(CONFIG_FILE,'utf8'));


export const LANGUAGE_VERSIONS = [
    {   label:"Java",
        versions:[
            { label:"java-0", description:"JDK 1.8.0_66", index:"0" },
            { label:"java-1",description: "JDK 9.0.1", index:"1" },
            { label:"java-2", description: "JDK 10.0.1", index:"2" },
            { label:"java-3", description: "JDK 11.0.4", index:"3" },
            { label:"java-4", description: "JDK 17.0.1", index:"4" }
        ]
    },
    {   label:"C",
        versions:[
            { label:"c-0", description:"GCC 5.3.0", index:"0" },
            { label:"c-1",description: "Zapcc 5.0.0", index:"1" },
            { label:"c-2", description: "GCC 7.2.0", index:"2" },
            { label:"c-3", description: "GCC 8.1.0", index:"3" },
            { label:"c-4", description: "GCC 9.1.0", index:"4" },
            { label:"c-5", description: "GCC 11.1.0", index:"5" }
        ]
    },
    {   label:"C-99",
        versions:[
            { label:"c99-0", description:"GCC 5.3.0", index:"0" },
            { label:"c99-1",description: "GCC 7.2.0", index:"1" },
            { label:"c99-2", description: "GCC 8.1.0", index:"2" },
            { label:"c99-3", description: "GCC 9.1.0", index:"3" },
            { label:"c99-4", description: "GCC 11.1.0", index:"4" }
        ]
    },
    {   label:"C++",
        versions:[
            { label:"cpp-0", description:"GCC 5.3.0", index:"0" },
            { label:"cpp-1",description: "Zapcc 5.0.0", index:"1" },
            { label:"cpp-2", description: "GCC 7.2.0", index:"2" },
            { label:"cpp-3", description: "GCC 8.1.0", index:"3" },
            { label:"cpp-4", description: "GCC 9.1.0", index:"4" },
            { label:"cpp-5", description: "GCC 11.1.0", index:"5" }
        ]
    },
    {   label:"C++ 14",
        versions:[
            { label:"cpp14-0", description:"g++ 14 GCC 5.3.0", index:"0" },
            { label:"cpp14-1",description: "g++ 14 GCC 7.2.0", index:"1" },
            { label:"cpp14-2", description: "g++ 14 GCC 8.1.0", index:"2" },
            { label:"cpp14-3", description: "g++ 14 GCC 8.1.0", index:"3" },
            { label:"cpp14-4", description: "GCC 11.1.0", index:"4" }
        ]
    },
    {   label:"C++ 17",
        versions:[
            { label:"cpp17-0", description:"g++ 17 GCC 9.1.0", index:"0" },
            { label:"cpp17-1",description: "GCC 11.1.0", index:"1" }
        ]
    },
    {   label:"PHP",
        versions:[
            { label:"php-0", description:"5.6.16", index:"0" },
            { label:"php-1",description: "7.1.11", index:"1" },
            { label:"php-2", description: "7.2.5", index:"2" },
            { label:"php-3", description: "7.3.10", index:"3" },
            { label:"php-4", description: "8.0.13", index:"4" }
        ]
    },
    {   label:"Perl",
        versions:[
            { label:"perl-0", description:"5.22.0", index:"0" },
            { label:"perl-1",description: "5.26.1", index:"1" },
            { label:"perl-2", description: "5.26.2", index:"2" },
            { label:"perl-3", description: "5.30.0", index:"3" },
            { label:"perl-4", description: "5.34.0", index:"4" }
        ]
    },
    {   label:"Python 2",
        versions:[
            { label:"python2-0", description:"2.7.11", index:"0" },
            { label:"python2-1",description: "2.7.15", index:"1" },
            { label:"python2-2", description: "2.7.16", index:"2" },
            { label:"python2-3", description: "2.7.18", index:"3" }
        ]
    },
    {   label:"Python 3",
        versions:[
            { label:"python3-0", description:"3.5.1", index:"0" },
            { label:"python3-1",description: "3.6.3", index:"1" },
            { label:"python3-2", description: "3.6.5", index:"2" },
            { label:"python3-3", description: "3.7.4", index:"3" },
            { label:"python3-4", description: "3.9.9", index:"4" }
        ]
    },
    {   label:"Ruby",
        versions:[
            { label:"ruby-0", description:"2.2.4", index:"0" },
            { label:"ruby-1",description: "2.4.2p198", index:"1" },
            { label:"ruby-2", description: "2.5.1p57", index:"2" },
            { label:"ruby-3", description: "2.6.5", index:"3" },
            { label:"ruby-4", description: "3.0.2", index:"4" }
        ]
    },
    {   label:"GO Lang",
        versions:[
            { label:"go-0", description:"1.5.2", index:"0" },
            { label:"go-1",description: "1.9.2", index:"1" },
            { label:"go-2", description: "1.10.2", index:"2" },
            { label:"go-3", description: "1.13.1", index:"3" },
            { label:"go-4", description: "1.17.3", index:"4" }
        ]
    },
    {   label:"Scala",
        versions:[
            { label:"scala-0", description:"2.12.0", index:"0" },
            { label:"scala-1", description: "2.12.4", index:"1" },
            { label:"scala-2", description: "2.12.5", index:"2" },
            { label:"scala-3", description: "2.13.0", index:"3" },
            { label:"scala-4", description: "2.13.6", index:"4" }
        ]
    },
    {   label:"Bash Shell",
        versions:[
            { label:"bash-0", description:"4.3.42", index:"0" },
            { label:"bash-1", description: "4.4.12", index:"1" },
            { label:"bash-2", description: "4.4.19", index:"2" },
            { label:"bash-3", description: "5.0.011", index:"3" },
            { label:"bash-4", description: "5.1.12", index:"4" }
        ]
    },
    {   label:"SQL",
        versions:[
            { label:"sql-0", description:"SQLite 3.9.2", index:"0" },
            { label:"sql-1",description: "SQLite 3.21.0", index:"1" },
            { label:"sql-2", description: "SQLite 3.21.0", index:"2" },
            { label:"sql-3", description: "SQLite 3.29.0", index:"3" },
            { label:"sql-4", description: "3.37.0", index:"4" }
        ]
    },
    {   label:"Pascal",
        versions:[
            { label:"pascal-0", description:"fpc 3.0.0", index:"0" },
            { label:"pascal-1",description: "fpc-3.0.2", index:"1" },
            { label:"pascal-2", description: "fpc-3.0.4", index:"2" },
            { label:"pascal-3", description: "fpc-3.2.2", index:"3" }
        ]
    },
    {   label:"C#",
        versions:[
            { label:"csharp-0", description:"mono 4.2.2", index:"0" },
            { label:"csharp-1",description: "mono 5.0.0", index:"1" },
            { label:"csharp-2", description: "mono 5.10.1", index:"2" },
            { label:"csharp-3", description: "mono 6.0.0", index:"3" },
            { label:"csharp-4", description: "mono-6.12.0", index:"4" }
        ]
    },
    {   label:"VB.Net",
        versions:[
            { label:"vbn-0", description:"mono 4.0.1", index:"0" },
            { label:"vbn-1",description: "mono 4.6", index:"1" },
            { label:"vbn-2", description: "mono 5.10.1", index:"2" },
            { label:"vbn-3", description: "mono 6.0.0", index:"3" },
            { label:"vbn-4", description: "mono 6.12.0", index:"4" }
        ]
    },
    {   label:"Haskell",
        versions:[
            { label:"haskell-0", description:"ghc 7.10.3", index:"0" },
            { label:"haskell-1",description: "ghc 8.2.1", index:"1" },
            { label:"haskell-2", description: "ghc 8.2.2", index:"2" },
            { label:"haskell-3", description: "ghc 8.6.5", index:"3" },
            { label:"haskell-4", description: "9.0.1", index:"4" }
        ]
    },
    {   label:"Objective C",
        versions:[
            { label:"objc-0", description:"GCC 5.3.0", index:"0" },
            { label:"objc-1",description: "GCC 7.2.0", index:"1" },
            { label:"objc-2", description: "GCC 8.1.0", index:"2" },
            { label:"objc-3", description: "GCC 8.1.0", index:"3" },
            { label:"objc-4", description: "GCC 11.1.0", index:"4" }
        ]
    },
    {   label:"Swift",
        versions:[
            { label:"swift-0", description:"2.2", index:"0" },
            { label:"swift-1",description: "3.1.1", index:"1" },
            { label:"swift-2", description: "4.1", index:"2" },
            { label:"swift-3", description: "5.1", index:"3" },
            { label:"swift-4", description: "5.5", index:"4" }
        ]
    },
    {   label:"Groovy",
        versions:[
            { label:"groovy-0", description:"2.4.6 JVM: 1.7.0_99", index:"0" },
            { label:"groovy-1",description: "2.4.12 JVM: 9.0.1", index:"1" },
            { label:"groovy-2", description: "2.4.15 JVM: 10.0.1", index:"2" },
            { label:"groovy-3", description: "2.5.8 JVM: 11.0.4", index:"3" },
            { label:"groovy-4", description: "3.0.9 JVM: 17.0.1", index:"4" }
        ]
    },
    {   label:"Fortran",
        versions:[
            { label:"fortran-0", description:"GNU 5.3.0", index:"0" },
            { label:"fortran-1",description: "GNU 7.2.0", index:"1" },
            { label:"fortran-2", description: "GNU 8.1.0", index:"2" },
            { label:"fortran-3", description: "GNU 9.1.0", index:"3" },
            { label:"fortran-4", description: "GNU 11.1.0", index:"4" }
        ]
    },
    {   label:"Brainf**k",
        versions:[
            { label:"brainfuck-0", description:"bfc-0.1", index:"0" }
        ]
    },
    {   label:"Lua",
        versions:[
            { label:"lua-0", description:"5.3.2", index:"0" },
            { label:"lua-1",description: "5.3.4", index:"1" },
            { label:"lua-2", description: "5.3.5", index:"2" },
            { label:"lua-3", description: "5.4.3", index:"3" }
        ]
    },
    {   label:"TCL",
        versions:[
            { label:"tcl-0", description:"8.6", index:"0" },
            { label:"tcl-1",description: "8.6.7", index:"1" },
            { label:"tcl-2", description: "8.6.8", index:"2" },
            { label:"tcl-3", description: "8.6.9", index:"3" },
            { label:"tcl-4", description: "8.6.12", index:"4" }
        ]
    },
    {   label:"Hack",
        versions:[
            { label:"hack-0", description:"HipHop VM 3.13.0", index:"0" }
        ]
    },
    {   label:"RUST",
        versions:[
            { label:"rust-0", description:"1.10.0", index:"0" },
            { label:"rust-1",description: "1.21.0", index:"1" },
            { label:"rust-2", description: "1.25.0", index:"2" },
            { label:"rust-3", description: "1.38.0", index:"3" },
            { label:"rust-4", description: "1.56.1", index:"4" }
        ]
    },
    {   label:"D",
        versions:[
            { label:"d-0", description:"DMD64 D Compiler v2.071.1", index:"0" },
            { label:"d-1",description: "DMD64 D Compiler v2.088", index:"1" },
            { label:"d-2", description: "DMD64 D Compiler v2.098", index:"2" }
        ]
    },
    {   label:"Ada",
        versions:[
            { label:"ada-0", description:"GNATMAKE 6.1.1", index:"0" },
            { label:"ada-1",description: "GNATMAKE 7.2.0", index:"1" },
            { label:"ada-2", description: "GNATMAKE 8.1.0", index:"2" },
            { label:"ada-3", description: "GNATMAKE 9.1.0", index:"3" },
            { label:"ada-4", description: "GNATMAKE 11.1.0", index:"4" }
        ]
    },
    {   label:"R Language",
        versions:[
            { label:"r-0", description:"3.3.1", index:"0" },
            { label:"r-1",description: "3.4.2", index:"1" },
            { label:"r-2", description: "3.5.0", index:"2" },
            { label:"r-3", description: "3.6.1", index:"3" },
            { label:"r-4", description: "4.1.2", index:"4" }
        ]
    },
    {   label:"FREE BASIC",
        versions:[
            { label:"freebasic-0", description:"1.05.0", index:"0" },
            { label:"freebasic-1",description: "1.07.1", index:"1" },
            { label:"freebasic-2", description: "1.08.1", index:"2" }
        ]
    },
    {   label:"VERILOG",
        versions:[
            { label:"verilog-0", description:"10.1", index:"0" },
            { label:"verilog-1",description: "10.2", index:"1" },
            { label:"verilog-2", description: "10.3", index:"2" },
            { label:"verilog-3", description: "11", index:"3" }
        ]
    },
    {   label:"COBOL",
        versions:[
            { label:"cobol-0", description:"GNU COBOL 2.0.0", index:"0" },
            { label:"cobol-1",description: "GNU COBOL 2.2.0", index:"1" },
            { label:"cobol-2", description: "GNU COBOL 3.0", index:"2" },
            { label:"cobol-3", description: "GNU COBOL 3.1.2", index:"3" }
        ]
    },
    {   label:"Dart",
        versions:[
            { label:"dart-0", description:"1.18.0", index:"0" },
            { label:"dart-1",description: "1.24.2", index:"1" },
            { label:"dart-2", description: "1.24.3", index:"2" },
            { label:"dart-3", description: "2.5.1", index:"3" },
            { label:"dart-4", description: "2.14.4", index:"4" }
        ]
    },
    {   label:"YaBasic",
        versions:[
            { label:"yabasic-0", description:"2.769", index:"0" },
            { label:"yabasic-1",description: "2.84.1", index:"1" }
        ]
    },
    {   label:"Clojure",
        versions:[
            { label:"clojure-0", description:"1.8.0", index:"0" },
            { label:"clojure-1",description: "1.9.0", index:"1" },
            { label:"clojure-2", description: "1.10.1", index:"2" },
            { label:"clojure-3", description: "1.10.3", index:"3" }
        ]
    },
    {   label:"NodeJS",
        versions:[
            { label:"nodejs-0", description:"6.3.1", index:"0" },
            { label:"nodejs-1",description: "9.2.0", index:"1" },
            { label:"nodejs-2", description: "10.1.0", index:"2" },
            { label:"nodejs-3", description: "12.11.1", index:"3" },
            { label:"nodejs-4", description: "17.1.0", index:"4" }
        ]
    },
    {   label:"Scheme",
        versions:[
            { label:"scheme-0", description:"Gauche 0.9.4", index:"0" },
            { label:"scheme-1",description: "Gauche 0.9.5", index:"1" },
            { label:"scheme-2", description: "Gauche 0.9.8", index:"2" },
            { label:"scheme-3", description: "Gauche 0.9.10", index:"3" }
        ]
    },
    {   label:"Forth",
        versions:[
            { label:"forth-0", description:"gforth 0.7.3", index:"0" }
        ]
    },
    {   label:"Prolog",
        versions:[
            { label:"prolog-0", description:"GNU Prolog 1.4.4", index:"0" },
            { label:"prolog-1",description: "GNU Prolog 1.4.5", index:"1" },
            { label:"prolog-2", description: "GNU Prolog 1.5.0", index:"2" }
        ]
    },
    {   label:"Octave",
        versions:[
            { label:"octave-0", description:"GNU 4.0.0", index:"0" },
            { label:"octave-1",description: "GNU 4.2.1", index:"1" },
            { label:"octave-2", description: "GNU 4.4.0", index:"2" },
            { label:"octave-3", description: "GNU 5.1.0", index:"3" },
            { label:"octave-4", description: "GNU 6.4.0", index:"4" }
        ]
    },
    {   label:"CoffeeScript",
        versions:[
            { label:"coffeescript-0", description:"1.11.1", index:"0" },
            { label:"coffeescript-1",description: "2.0.0", index:"1" },
            { label:"coffeescript-2", description: "2.3.0", index:"2" },
            { label:"coffeescript-3", description: "2.4.1", index:"3" },
            { label:"coffeescript-4", description: "2.6.1", index:"4" }
        ]
    },
    {   label:"Icon",
        versions:[
            { label:"icon-0", description:"9.4.3", index:"0" },
            { label:"icon-1",description: "9.5.1", index:"1" }
        ]
    },
    {   label:"F#",
        versions:[
            { label:"fsharp-0", description:"4.1", index:"0" },
            { label:"fsharp-1",description: "4.5.0", index:"1" }
        ]
    },
    {   label:"Assembler - NASM",
        versions:[
            { label:"nasm-0", description:"2.11.08", index:"0" },
            { label:"nasm-1",description: "2.13.01", index:"1" },
            { label:"nasm-2", description: "2.13.03", index:"2" },
            { label:"nasm-3", description: "2.14.02", index:"3" },
            { label:"nasm-4", description: "2.15.05", index:"4" }
        ]
    },
    {   label:"Assembler - GCC",
        versions:[
            { label:"gccasm-0", description:"GCC 6.2.1", index:"0" },
            { label:"gccasm-1",description: "GCC 8.1.0", index:"1" },
            { label:"gccasm-2", description: "GCC 9.1.0", index:"2" },
            { label:"gccasm-3", description: "GCC 11.1.0", index:"3" }
        ]
    },
    {   label:"Intercal",
        versions:[
            { label:"intercal-0", description:"0.30", index:"0" }
        ]
    },
    {   label:"Nemerle",
        versions:[
            { label:"nemerle-0", description:"1.2.0.507", index:"0" }
        ]
    },
    {   label:"Ocaml",
        versions:[
            { label:"ocaml-0", description:"4.03.0", index:"0" },
            { label:"ocaml-1",description: "4.08.1", index:"1" },
            { label:"ocaml-2", description: "4.12.0", index:"2" }
        ]
    },
    {   label:"Unlambda",
        versions:[
            { label:"unlambda-0", description:"0.1.3", index:"0" },
            { label:"unlambda-1",description: "0.1.4.2", index:"1" }
        ]
    },
    {   label:"Picolisp",
        versions:[
            { label:"picolisp-0", description:"3.1.11.1", index:"0" },
            { label:"picolisp-1",description: "17.11.14", index:"1" },
            { label:"picolisp-2", description: "18.5.11", index:"2" },
            { label:"picolisp-3", description: "18.9.5", index:"3" },
            { label:"picolisp-4", description: "21.6.30", index:"4" }
        ]
    },
    {   label:"SpiderMonkey",
        versions:[
            { label:"spidermonkey-0", description:"38", index:"0" },
            { label:"spidermonkey-1",description: "45.0.2", index:"1" }
        ]
    },
    {   label:"Rhino JS",
        versions:[
            { label:"rhino-0", description:"1.7.7.1", index:"0" },
            { label:"rhino-1",description: "1.7.7.2", index:"1" },
            { label:"rhino-2", description: "1.7.13", index:"2" }
        ]
    },
    {   label:"BC",
        versions:[
            { label:"bc-0", description:"1.06.95", index:"0" },
            { label:"bc-1",description: "1.07.1", index:"1" }
        ]
    },
    {   label:"CLISP",
        versions:[
            { label:"clisp-0", description:"GNU CLISP 2.49 - GNU C 5.2.0", index:"0" },
            { label:"clisp-1",description: "GNU CLISP 2.49 - GNU C 6.2.1", index:"1" },
            { label:"clisp-2", description: "GNU CLISP 2.49.93 - GNU 8.1.0", index:"2" },
            { label:"clisp-3", description: "GNU CLISP 2.49.93 - GNU 9.1.0", index:"3" },
            { label:"clisp-4", description: "ecl 21.2.1", index:"4" },
            { label:"clisp-5", description: "sbcl 2.1.9", index:"5" },
            { label:"clisp-6", description: "ccl 1.12.1", index:"6" },
            { label:"clisp-7", description: "abcl 1.8.0", index:"7" }
        ]
    },
    {   label:"Elixir",
        versions:[
            { label:"elixir-0", description:"1.3.4", index:"0" },
            { label:"elixir-1",description: "1.5.2", index:"1" },
            { label:"elixir-2", description: "1.6.4", index:"2" },
            { label:"elixir-3", description: "1.9.1", index:"3" },
            { label:"elixir-4", description: "1.12.2", index:"4" }
        ]
    },
    {   label:"Factor",
        versions:[
            { label:"factor-0", description:"8.25", index:"0" },
            { label:"factor-1",description: "8.28", index:"1" },
            { label:"factor-2", description: "8.29", index:"2" },
            { label:"factor-3", description: "8.31", index:"3" }
        ]
    },
    {   label:"Falcon",
        versions:[
            { label:"falcon-0", description:"0.9.6.8 (Chimera)", index:"0" }
        ]
    },
    {   label:"Fantom",
        versions:[
            { label:"fantom-0", description:"1.0.69", index:"0" }
        ]
    },
    {   label:"Nim",
        versions:[
            { label:"nim-0", description:"0.15.0", index:"0" },
            { label:"nim-1",description: "0.17.2", index:"1" },
            { label:"nim-2", description: "0.18.0", index:"2" },
            { label:"nim-3", description: "1.4.8", index:"3" }
        ]
    },
    {   label:"Pike",
        versions:[
            { label:"pike-0", description:"v8.0", index:"0" },
            { label:"pike-1",description: "v8.0.702", index:"1" }
        ]
    },
    {   label:"SmallTalk",
        versions:[
            { label:"smalltalk-0", description:"GNU SmallTalk 3.2.92", index:"0" }
        ]
    },
    {   label:"OZ Mozart",
        versions:[
            { label:"mozart-0", description:"2.0.0 (OZ 3)", index:"0" }
        ]
    },
    {   label:"LOLCODE",
        versions:[
            { label:"lolcode-0", description:"0.10.5", index:"0" }
        ]
    },
    {   label:"Racket",
        versions:[
            { label:"racket-0", description:"6.11", index:"0" },
            { label:"racket-1",description: "6.12", index:"1" },
            { label:"racket-2", description: "7.4", index:"2" },
            { label:"racket-3", description: "8.3", index:"3" }
        ]
    },
    {   label:"Kotlin",
        versions:[
            { label:"kotlin-0", description:"1.1.51 (JRE 9.0.1+11)", index:"0" },
            { label:"kotlin-1",description: "1.2.40 (JRE 10.0.1)", index:"1" },
            { label:"kotlin-2", description: "1.3.50 (JRE 11.0.4)", index:"2" },
            { label:"kotlin-3", description: "1.6.0 (JRE 17.0.1+12)", index:"3" }
        ]
    },
    {   label:"Whitespace",
        versions:[
            { label:"whitespace-0", description:"0.3", index:"0" }
        ]
    },
    {   label:"Erlang",
        versions:[
            { label:"erlang-0", description:"22.1 ", index:"0" },
            { label:"erlang-1",description: "24", index:"1" }
        ]
    },
    {   label:"J Language",
        versions:[
            { label:"jlang-0", description:"9.01.10", index:"0" }
        ]
    },
    {   label:"Haxe",
        versions:[
            { label:"haxe-0", description:"4.2.4", index:"0" }
        ]
    },
    {   label:"FASM",
        versions:[
            { label:"fasm-0", description:"1.73.27", index:"0" }
        ]
    },
    {   label:"AWK",
        versions:[
            { label:"awk-0", description:"NU Awk 5.1.1, API: 3.1", index:"0" }
        ]
    },
    {   label:"Algol 68",
        versions:[
            { label:"algol-0", description:"Genie 2.8.5", index:"0" }
        ]
    },
    {   label:"Befunge",
        versions:[
            { label:"befunge-0", description:"cfunge 0.9.0", index:"0" }
        ]
    }
]

