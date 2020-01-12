

const players = new Tone.Players({
    0 :'samples/Arcade/kick/kick2.wav',
    1 : 'samples/Arcade/snare/snare1.wav',
    2 : 'samples/Arcade/hihat/hihat1.wav',
    3 : 'samples/Arcade/percussion/cowbell.wav'
});

const gain = new Tone.Gain(0.6);
gain.toMaster();
players.connect(gain);

const $rows = $('.stepContainer'),
  $stepBoxes = $('.stepBox'),
  $stepCounterBoxes = $('.stepCounterBox');

$stepBoxes.on('click', function() {
  $($stepBoxes).removeClass('selected');
  $(this).toggleClass('active');
  $(this).addClass('selected');
});

let index = 0;

Tone.Transport.scheduleRepeat(repeat, '8n');
Tone.Transport.start();


function repeat(time) {
  let sequenceLength = $stepBoxes.length / $rows.length;
  let stepCount = index % 8;
  $($stepCounterBoxes).removeClass('currentStep');
  for (let i = 0; i < $rows.length; i++) {
    let $row = $rows[i];
    let $currentStep = $row.querySelector(`div:nth-child(${stepCount+1})`);
    if ($($currentStep).hasClass('stepCounterBox')){
      $($currentStep).toggleClass('currentStep');
    }
    if ($($currentStep).hasClass('active')) {
      players.get(i).start();
    }
  }
  index++;
}


