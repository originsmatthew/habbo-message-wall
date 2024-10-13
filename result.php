
<?php
// Include necessary functions
include('functions.php');
include('hc.php');

if (isset($_POST['user1']) && isset($_POST['user2'])) {
    $user1 = $_POST['user1'];
    $user2 = $_POST['user2'];

    // Call the function to generate the image with both avatars
    generateImageWithAvatars($user1, $user2);
}
?>
