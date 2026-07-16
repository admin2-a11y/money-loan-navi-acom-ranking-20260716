<?php
$catalog = [
  'acom' => 'https://whatsmyasp.com/3k701mem558983c8/cl/?bId=09c6577e',
  'promise' => 'https://whatsmyasp.com/3k701mem558983c8/cl/?bId=r56c91bf',
  'mobit' => 'https://whatsmyasp.com/3k701mem558983c8/cl/?bId=6dcl109c',
  'aiful' => 'https://whatsmyasp.com/3k701mem558983c8/cl/?bId=3ef9fcfc'
];
$allowed = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','utm_source_platform','utm_creative_format','utm_marketing_tactic','gclid','dclid','wbraid','gbraid','fbclid','msclkid','yclid','ttclid','srsltid'];
$item = isset($_GET['item']) ? (string) $_GET['item'] : '';
if (!array_key_exists($item, $catalog)) { http_response_code(400); header('Location: ./index.html', true, 302); exit; }
$target = $catalog[$item];
$tracking = [];
foreach ($allowed as $key) { if (isset($_GET[$key]) && is_scalar($_GET[$key])) { $tracking[$key] = (string) $_GET[$key]; } }
if ($tracking) { $target .= (strpos($target, '?') === false ? '?' : '&') . http_build_query($tracking, '', '&', PHP_QUERY_RFC3986); }
header('Location: ' . $target, true, 302);
exit;
?>
