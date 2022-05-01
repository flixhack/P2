Ny: Brug Socket.io (stabil og hurtig end fetch API, især realtid)
Her bruger jeg nodejs, express og socket.io til at kommunikere mellem klienten og serveren.
For at tjekke koderne:
- Installer nodejs, express og socket.io (husk læg folder 'public' og to file 'socket.js' og 'socket.html' på en samme folder)
- 
For at simulerer: 
- Først åbn en server ved at køre filen socket.js i nodejs (node socket.js)
- Bagefter åbn klient (hjemmeside http://localhost:3000 ). Der kan åbne flere sider (16), men her kun jeg tjekker med tre (lige som tre users)
- På hver side (user) kan input en json fil så serveren vil sende tre tilbage til hver side (user).
- Tiden i funktion setTimeout vælger jeg 8s for at tjekke, det kan justeres i vores projekt og tilføjer at slette json efter sender serveren til klienten. 
(Jeg kan ikke tilføje billede her, I kan se det på read.docx)
 
Den sidste gang
Fetch API:
Jeg bruger fetch API for at sende data fra klienter til serveren.
For at tjekke koderne:
1.	Serveren: kør filen server.js (nodejs)
2.	Klienten: kør test.html og test.js (javascript)
Synkronisere og setTimeout: (simulerer kun 6 users, dette antal kan justeres til 16)
-	Når der er 6 users (maksimalt), samler serveren json-filene og sender dem tilbage til klienten med det samme (ingen ventetid).
-	Når antallet af users er mindre end 6, stiller jeg ventetid i 10 sekunder (fordi der skal input data fra tastaturen) og derefter sender serveren json-filene til klienten. (ventetid kan justeres)
                                              ventetid



