# vix-vanilla



kai renderinam visus elementus, funkcijos ne visada buna array gale. vadinasi mums jas reikia padeti i queue, kuri prades veikti tik visiem elementam baigus renderintis.

bet tada yra problema, kad tame queue negaliu prieiti variablu. Jeigu a, c ir d yra konkrecios values, bet b yra funkcija kuri dirba su a c ir d, as negaliu jos padet i sona kol baigsis renderintis a c ir d. nebent, as naudosiu promisus ir resolvinsiu b tik resolvinus visus kitus. this can work maybe. 

probema su promisais yra tame kad as neturiu budo kaip 


jeigu nesuveikia promisai, tada tiesiog prasausim antra FOR loopa. pirmas for loopas surenka visus duomenis, antras for loopas juos sutvarko ir sudeda i vietas. (nesu tikras kad suveiks)

naudoti global variabla kaip indexa kuri mes ++ kiekviena karta kai iteritinam over the foor loopa. ir tada ta indexa naudojam antram for loopui kuris sudelioja sutvarkytas value i vieta.
