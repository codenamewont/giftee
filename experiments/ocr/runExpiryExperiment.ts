import { Asset } from 'expo-asset';
import labels from './labels.json';
import { extractText } from '@/features/gifticon/utils/ocr/extractText';
import { parseExpiry } from '@/features/gifticon/utils/ocr/parseExpiry';

const imageMap: Record<string, number> = {
  '01.png': require('./dataset/01.png'),
  '02.png': require('./dataset/02.png'),
  '03.png': require('./dataset/03.png'),
  '04.png': require('./dataset/04.png'),
  '05.png': require('./dataset/05.png'),
  '06.png': require('./dataset/06.png'),
  '07.png': require('./dataset/07.png'),
  '08.png': require('./dataset/08.png'),
  '09.png': require('./dataset/09.png'),
  '10.png': require('./dataset/10.png'),
  '11.png': require('./dataset/11.png'),
  '12.png': require('./dataset/12.png'),
  '13.png': require('./dataset/13.png'),
  '14.png': require('./dataset/14.png'),
  '15.png': require('./dataset/15.png'),
  '16.png': require('./dataset/16.png'),
  '17.png': require('./dataset/17.png'),
  '18.png': require('./dataset/18.png'),
  '19.png': require('./dataset/19.png'),
  '20.png': require('./dataset/20.png'),
  '21.png': require('./dataset/21.png'),
  '22.png': require('./dataset/22.png'),
  '23.png': require('./dataset/23.png'),
  '24.png': require('./dataset/24.png'),
  '25.png': require('./dataset/25.png'),
  '26.png': require('./dataset/26.png'),
  '27.png': require('./dataset/27.png'),
  '28.png': require('./dataset/28.png'),
  '29.png': require('./dataset/29.png'),
  '30.png': require('./dataset/30.png'),
};

export async function runExpiryExperiment() {
  let total = 0;
  let correct = 0;

  for (const item of labels) {
    const asset = Asset.fromModule(imageMap[item.image]);
    await asset.downloadAsync();

    const uri = asset.localUri ?? asset.uri;

    const lines = await extractText(uri);
    const predExpiry = parseExpiry(lines);

    const isCorrect = predExpiry === item.expiry;
    if (isCorrect) correct++;
    total++;

    console.log(
      `[${item.image}]`,
      isCorrect ? '✅' : '❌',
      `label: ${item.expiry}`,
      `pred: ${predExpiry}`
    );
  }
  console.log(`accuracy: ${((correct / total) * 100).toFixed(1)}% (${correct}/${total})`);
}
