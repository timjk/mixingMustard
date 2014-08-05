var Jazz = document.getElementById("Jazz1"); if(!Jazz || !Jazz.isJazz) Jazz = document.getElementById("Jazz2");
Jazz.MidiInOpen(0,function(t,a){ Jazz.MidiOutLong(a);});
