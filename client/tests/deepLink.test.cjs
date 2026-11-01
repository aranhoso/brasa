// node --test tests/
const test = require('node:test');
const assert = require('node:assert');
const { parseInviteLink, inviteCodeFromArgv } = require('../electron/deepLink.cjs');

test('extrai o código de brasa://convite/<código>', () => {
  assert.strictEqual(parseInviteLink('brasa://convite/AbC12xyZ'), 'AbC12xyZ');
  assert.strictEqual(parseInviteLink('brasa://convite/AbC12xyZ/'), 'AbC12xyZ'); // barra que o Windows acrescenta
  assert.strictEqual(parseInviteLink('BRASA://Convite/AbC12xyZ'), 'AbC12xyZ');
  assert.strictEqual(parseInviteLink('brasa://convite/AbC12xyZ?from=web#x'), 'AbC12xyZ');
  assert.strictEqual(parseInviteLink('"brasa://convite/old_Code-1"'), 'old_Code-1'); // código antigo (token_urlsafe)
  assert.strictEqual(parseInviteLink('brasa://invite/AbC12xyZ'), 'AbC12xyZ');
});

test('recusa o que não é convite válido', () => {
  for (const bad of [
    'brasa://convite/', 'brasa://convite/abc', 'brasa://convite/a b c d', 'brasa://convite/../../x',
    'brasa://convite/' + 'a'.repeat(33), 'https://brasa.example/convite/AbC12xyZ', 'brasa://outra/AbC12xyZ',
    'brasa://convite/AbC12xyZ/extra', 'brasa://convite/<script>', null, undefined, 42
  ]) {
    assert.strictEqual(parseInviteLink(bad), null, String(bad));
  }
});

test('encontra o link no meio da linha de comando', () => {
  const winArgv = ['C:\\Program Files\\Brasa\\Brasa.exe', '--allow-file-access-from-files', 'brasa://convite/AbC12xyZ/'];
  assert.strictEqual(inviteCodeFromArgv(winArgv), 'AbC12xyZ');
  const devArgv = ['electron.exe', 'C:\\dev\\brasa-client', '--', 'brasa://convite/Zz99Yy88'];
  assert.strictEqual(inviteCodeFromArgv(devArgv), 'Zz99Yy88');
  assert.strictEqual(inviteCodeFromArgv(['Brasa.exe', '--hidden']), null);
  assert.strictEqual(inviteCodeFromArgv(undefined), null);
});
