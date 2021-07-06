const characterDescritptions = {
    PLO: "Zerowej nocy poznaje postać dowolnie wybranego gracza.", 
    amorek: "Zerowej nocy łączy dwóch dowolnie wybranych graczy. Jeśli jeden z nich straci życie, to drugi również umiera .", 
    sędzia: "Decyduje, czy wyraża zgodę na pojedynek (czy dany pojedynek się odbędzie). Jeśli Sędzia nie żyje, zawsze jest zgoda na pojedynek.",
    wariat: "W trakcie dnia raz na grę może zabić dowolnego gracza.",
    komisarzCattani: "Każdej niezerowej nocy poznaje prawdziwą frakcję wybranego przez siebie gracza.",
    lekarz: "Każdej niezerowej nocy wybiera gracza, którego będzie leczyć, czyli chronić przed strzałem Mafii. Raz na grę może uleczyć samego siebie.",
    szybkiZMiasta: "Wygrywa pojedynki bez względu na wynik głosowania (wyjątkiem jest sytuacja, kiedy wszyscy wstrzymują się od głosu i nikt nie umiera oraz pojedynek z Szybkim z Mafii, w którym liczy się wynik głosowania).",
    szybkiZMafii: "Wygrywa pojedynki bez względu na wynik głosowania (wyjątkiem jest sytuacja, kiedy wszyscy wstrzymują się od głosu i nikt nie umiera oraz pojedynek z Szybkim z Miasta, w którym liczy się wynik głosowania). Hierarchia w Mafii - 3.",
    święty: "Jeśli zginie w wyniku głosowania, umiera każdy, kto zagłosował na jego śmierć.",
    kokietka: "Kokietka - w głosowaniu na koniec dnia jest sprawdzana jako Miasto. Hierarchia w Mafii - 1 (najwyższa).", 
    terrorysta: "Umierając, wybucha w następnego gracza na liście, który umiera razem z nim. Hierarchia w Mafii - 2.", 
    mściciel: "Wyłącza funkcję dowolnego gracza na następny dzień i następną noc. Hierarchia w Mafii - 4 (najniższa)."
}

export default characterDescritptions