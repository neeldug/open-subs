import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  asyncRecognise();
});

async function asyncRecognise() {
    const fs = require('fs');

    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech');

    // Creates a client
    const client = new speech.SpeechClient();

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    const filename = '/Users/neel/open-subs/public/philo.mp3';
    const encoding = 'MP3';
    const sampleRateHertz = 44100;
    const languageCode = 'en-GB';

    const request = {
      config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
      },
      interimResults: false, // If you want interim results, set this to true
    };

    // Stream the audio to the Google Cloud Speech API
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', data => {
        console.log(
          `Transcription: ${data.results[0].alternatives[0].transcript}`
        );
      });

    // Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
    fs.createReadStream(filename).pipe(recognizeStream);
}
