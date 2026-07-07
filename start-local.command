#!/bin/zsh
set -e

cd "$(dirname "$0")"

PORT="${PORT:-3001}"
CODEX_NODE="/Users/ryomasmacbookair/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"

if [ -x "$CODEX_NODE" ]; then
  NODE_BIN="$CODEX_NODE"
  export PATH="$(dirname "$CODEX_NODE"):$PATH"
elif command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
else
  echo "Node.js が見つかりません。"
  echo "先に Node.js をインストールするか、Codex内蔵Nodeが存在するか確認してください。"
  echo ""
  echo "推奨: brew install node"
  exit 1
fi

if [ ! -f "./node_modules/.bin/next" ]; then
  echo "node_modules が見つかりません。依存関係のインストールが必要です。"
  echo "Node.js を入れた後に npm install を実行してください。"
  exit 1
fi

URL="http://localhost:${PORT}"

echo "年収シミュレーターを起動します。"
echo "URL: ${URL}"
echo ""
echo "終了するときは、このターミナルで Control + C を押してください。"
echo ""

(sleep 2 && open "$URL") >/dev/null 2>&1 &

echo "Node: $("$NODE_BIN" --version)"
echo ""

exec ./node_modules/.bin/next dev --hostname 127.0.0.1 --port "$PORT"
