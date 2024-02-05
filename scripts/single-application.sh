OS=''
TMP_NODE=./dist/node-tmp

if [ "$(uname)" == "Darwin" ]; then
    OS='mac'
elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    OS='linux'
fi

echo "OS: $OS"
echo "TMP_NODE: $TMP_NODE"

node --experimental-sea-config sea-config.json
cp $(command -v node) $TMP_NODE
chmod 777 $TMP_NODE

if [ "$OS" == "mac" ]; then
    codesign --remove-signature $TMP_NODE
    npx postject $TMP_NODE NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
    --macho-segment-name NODE_SEA
    codesign --sign - $TMP_NODE
fi

if [ "$OS" == "linux" ]; then
    npx postject $TMP_NODE NODE_SEA_BLOB sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
fi

mv $TMP_NODE dist/raycast-unblock-app

echo "Done"