#!/usr/bin/env sh
# Build every variant three times to resolve references and PDF tagging page data.
#   Rishikesh-S-Resume        two-page master
#   Rishikesh-S-Resume-1page  one-page version
#   Rishikesh-S-Resume-web    master without the phone number, copied to public/
set -eu
cd "$(dirname "$0")"
export PATH="/Library/TeX/texbin:$PATH"
build() { # jobname, definitions
  pdflatex -interaction=nonstopmode -halt-on-error -jobname="$1" \
    "$2\\input{Rishikesh-S-Resume.tex}" >"$1.build.log" 2>&1 || {
    cat "$1.build.log"
    exit 1
  }
}
for pass in 1 2 3; do
  build Rishikesh-S-Resume ''
  build Rishikesh-S-Resume-1page '\def\onepage{}'
  build Rishikesh-S-Resume-web '\def\nophone{}'
done
for variant in Rishikesh-S-Resume Rishikesh-S-Resume-1page Rishikesh-S-Resume-web; do
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
mv Rishikesh-S-Resume-web.pdf ../public/Rishikesh-S-Resume.pdf
printf 'public/Rishikesh-S-Resume.pdf updated\n'
