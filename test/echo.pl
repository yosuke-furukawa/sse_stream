while (1) {
  my $time = time();
  my $num = int(rand(10));
  my $text = "FINE";
  $text = "ERROR!!!" if ($num % 2);
  system "echo $text >> test.txt";
  sleep(1);
}
