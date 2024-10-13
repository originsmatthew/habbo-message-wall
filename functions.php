
<?php
// This function returns the URL for the Habbo avatar based on the provided username
function getAvatarURL($username, $gesture = 'std', $action = 'wav', $direction = '2') {
    return "https://habboera.com/imager?habbo=" . $username . "&size=l&gesture=" . $gesture . "&action=" . $action . "&direction=" . $direction;
}
?>
