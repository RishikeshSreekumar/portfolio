#!/usr/bin/env sh
# Build both variants three times to resolve references and PDF tagging page data.
set -eu
cd "$(dirname "$0")"
export PATH="/Library/TeX/texbin:$PATH"
for pass in 1 2 3; do
  pdflatex -interaction=nonstopmode -halt-on-error Rishikesh-S-Resume.tex >Rishikesh-S-Resume.build.log 2>&1 || {
    cat Rishikesh-S-Resume.build.log
    exit 1
  }
  pdflatex -interaction=nonstopmode -halt-on-error \
    -jobname=Rishikesh-S-Resume-1page \
    '\def\onepage{}\input{Rishikesh-S-Resume.tex}' >Rishikesh-S-Resume-1page.build.log 2>&1 || {
    cat Rishikesh-S-Resume-1page.build.log
    exit 1
  }
done
for variant in Rishikesh-S-Resume Rishikesh-S-Resume-1page; do
  # Ignore the rerun notice: three passes above already resolved it.
  if grep -E 'Overfull|Underfull|Warning' "$variant.log" | grep -v 'Label(s) may have changed'; then
    printf 'Review layout/compiler messages in %s.log\n' "$variant"
    exit 1
  fi
  expected=2
  [ "$variant" != Rishikesh-S-Resume-1page ] || expected=1
  pages=$(pdfinfo "$variant.pdf" | awk '/^Pages:/{print $2}')
  [ "$pages" = "$expected" ] || {
    printf '%s: expected %s pages, got %s\n' "$variant" "$expected" "$pages"
    exit 1
  }
  printf '%s.pdf: %s page(s)\n' "$variant" "$pages"
  rm -f "$variant.aux" "$variant.log" "$variant.out" "$variant.build.log"
done
