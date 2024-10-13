
<?php
// Load the sofa and avatar images and position them correctly
function generateImageWithAvatars($user1, $user2) {
    // Get avatar URLs
    $avatarURL1 = getAvatarURL($user1);
    $avatarURL2 = getAvatarURL($user2);

    // Load the sofa image
    $sofa = imagecreatefromgif('HCSofaT.gif');

    // Load the avatar images from URLs
    $avatar1 = imagecreatefrompng($avatarURL1);
    $avatar2 = imagecreatefrompng($avatarURL2);

    // Coordinates to position the avatars on the sofa
    $x1 = 40; // Example positions for avatar 1
    $y1 = 50;
    $x2 = 120; // Example positions for avatar 2
    $y2 = 50;

    // Place the avatars on the sofa
    imagecopy($sofa, $avatar1, $x1, $y1, 0, 0, imagesx($avatar1), imagesy($avatar1));
    imagecopy($sofa, $avatar2, $x2, $y2, 0, 0, imagesx($avatar2), imagesy($avatar2));

    // Output the final image
    header('Content-Type: image/gif');
    imagegif($sofa);

    // Clean up
    imagedestroy($sofa);
    imagedestroy($avatar1);
    imagedestroy($avatar2);
}
?>
