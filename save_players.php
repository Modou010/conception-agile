<?php
// Vérifier si la requête est bien POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lire les données JSON envoyées
    $data = file_get_contents('php://input');
    $players = json_decode($data, true);

    // Vérifier si les noms des joueurs sont valides
    if (isset($players['players']) && is_array($players['players'])) {
        // Chemin du fichier JSON pour enregistrer les noms
        $file = 'players.json';

        // Enregistrer les données dans le fichier JSON
        if (file_put_contents($file, json_encode($players, JSON_PRETTY_PRINT))) {
            http_response_code(200); // Succès
            echo json_encode(["message" => "Les noms des joueurs ont été enregistrés avec succès."]);
        } else {
            http_response_code(500); // Erreur serveur
            echo json_encode(["message" => "Erreur lors de l'enregistrement des joueurs."]);
        }
    } else {
        http_response_code(400); // Mauvaise requête
        echo json_encode(["message" => "Données invalides."]);
    }
} else {
    http_response_code(405); // Méthode non autorisée
    echo json_encode(["message" => "Méthode non autorisée."]);
}
?>
