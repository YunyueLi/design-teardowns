#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Comet 安装 / 首启引导 —— 高清协作录制脚本
#
# 背景：Claude 无法自授 macOS「屏幕录制」权限、也无法驱动你的桌面 GUI，
# 所以由你亲自点操作、脚本负责录高清视频 + 自动切关键帧。
#
# 一次性授权（只需做一次）：
#   系统设置 ▸ 隐私与安全性 ▸ 屏幕录制 ▸ 打开你运行本脚本的「终端 / iTerm」开关
#   （首次运行 ffmpeg 时系统也会弹窗，点“打开系统设置”授权后重跑本脚本）
#
# 用法：
#   1) 录 fancy 首启引导（推荐，安全，不动你现有 Comet 数据）：
#        ./RECORD_INSTALL.sh onboarding
#   2) 录完整重装（会删除现有 Comet 及其配置，破坏性，慎用）：
#        ./RECORD_INSTALL.sh reinstall
#   3) 只录屏、自己手动操作：
#        ./RECORD_INSTALL.sh raw
#   录制中按  q  结束；结束后自动切关键帧到 ./capture/<时间戳>/keyframes/
# ---------------------------------------------------------------------------
set -euo pipefail
MODE="${1:-onboarding}"
STAMP="$(date +%Y%m%d_%H%M%S)"
OUT="$(cd "$(dirname "$0")" && pwd)/capture/$STAMP"
mkdir -p "$OUT/keyframes"
VIDEO="$OUT/comet_${MODE}_${STAMP}.mov"

echo "== 可用录制设备（找到 'Capture screen 0' 的序号，通常是主屏）=="
ffmpeg -hide_banner -f avfoundation -list_devices true -i "" 2>&1 | grep -iE "screen|capture" || true
SCREEN_IDX="${SCREEN_IDX:-1}"   # 需要的话改成上面列出的屏幕序号：SCREEN_IDX=2 ./RECORD_INSTALL.sh
echo "使用屏幕序号 = $SCREEN_IDX（如不对，用 SCREEN_IDX=N 重跑）"

# --- 按模式准备被录对象 -----------------------------------------------------
case "$MODE" in
  onboarding)
    FRESH="/tmp/comet_fresh_$STAMP"
    echo ">> 将用全新 profile 启动 Comet 触发首启引导（不影响你现有数据）"
    echo ">> 录制开始后 Comet 会自动打开，跟着点：用户名 → 头像行星 → 主题；完成后回到本终端按 q"
    LAUNCH=(open -na "/Applications/Comet.app" --args --user-data-dir="$FRESH" "chrome://perplexity-onboarding/")
    ;;
  reinstall)
    echo "!! 破坏性：这会删除 /Applications/Comet.app 与 ~/Library/Application Support/Comet"
    read -r -p "确认继续？输入 yes：" c; [ "$c" = "yes" ] || { echo "已取消"; exit 1; }
    echo ">> 请手动把新下载的 Comet .dmg 放到 ~/Downloads/Comet.dmg 再运行本模式"
    [ -f "$HOME/Downloads/Comet.dmg" ] || { echo "未找到 ~/Downloads/Comet.dmg，先下载：https://www.perplexity.ai/comet"; exit 1; }
    rm -rf "/Applications/Comet.app" "$HOME/Library/Application Support/Comet" || true
    LAUNCH=(open "$HOME/Downloads/Comet.dmg")
    ;;
  raw) LAUNCH=(true) ;;
  *) echo "未知模式：$MODE"; exit 1 ;;
esac

echo
echo "== 开始录制（HD, 60fps, 光标可见）。按 q 结束 =="
# 先启动被录对象，再开录
"${LAUNCH[@]}" >/dev/null 2>&1 || true
sleep 1
ffmpeg -hide_banner -f avfoundation -capture_cursor 1 -framerate 60 \
       -i "${SCREEN_IDX}:none" \
       -c:v libx264 -crf 18 -preset veryfast -pix_fmt yuv420p \
       "$VIDEO"

echo
echo "== 录制完成：$VIDEO =="
echo "== 切关键帧（场景突变检测 + 每秒兜底一帧）=="
# 场景变化关键帧
ffmpeg -y -loglevel error -i "$VIDEO" \
  -vf "select='gt(scene,0.12)',showinfo" -vsync vfr -q:v 2 \
  "$OUT/keyframes/scene_%03d.jpg" 2>/dev/null || true
# 每秒兜底一帧 + 一张总览联系表
ffmpeg -y -loglevel error -i "$VIDEO" -vf "fps=1" -q:v 3 "$OUT/keyframes/t_%03d.jpg"
ffmpeg -y -loglevel error -i "$VIDEO" -vf "fps=1,scale=320:-1,tile=6x5" -frames:v 1 "$OUT/contactsheet.jpg" 2>/dev/null || true

echo
echo "全部完成："
echo "  视频：      $VIDEO"
echo "  关键帧：    $OUT/keyframes/ （scene_*=动效突变帧, t_*=逐秒帧）"
echo "  联系表：    $OUT/contactsheet.jpg"
echo "把 $OUT 整个目录发给 Claude，即可做逐帧动效解析。"
