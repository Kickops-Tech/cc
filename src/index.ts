import { getFlag, getFlagName, isDigitValid, isValid } from '~';

const input = document.getElementById('cc') as HTMLInputElement;
const flagName = document.getElementById('flag-name') as HTMLImageElement;
const flag = document.getElementById('flag') as HTMLImageElement;
const valid = document.getElementById('valid') as HTMLImageElement;
const validDigit = document.getElementById('valid-digit') as HTMLImageElement;

function update() {
  const __name = getFlagName(input?.value as string);
  const __flag = getFlag(input?.value as string);
  const __valid = isValid(input?.value as string);
  const __validDigit = isDigitValid(input?.value as string);
  flagName.innerHTML = `<strong>Flag Name:</strong> ${__name || 'unknown (false)'}`;
  flag.innerHTML = `<strong>Flag:</strong> ${__flag || 'unknown (false)'}`;
  valid.innerHTML = `<strong>Valid:</strong> ${__valid || 'false'}`;
  validDigit.innerHTML = `<strong>Valid:</strong> ${__validDigit || 'false'}`;
}

input.addEventListener('input', update);
update();
