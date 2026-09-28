# Slide 32 privacy-correctness plot (Ed'24 & Ed'25), vector output.
# nuActionGUI -> blue, Flask -> black. Saves both PDF and SVG.
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

BG   = "#fbfaf7"   # deck background
MD   = "#215caf"   # nuActionGUI -> blue
FL   = "#1e2b45"   # Flask       -> black (deck ink)
INK  = "#1e2b45"
MUTE = "#8a8577"
GRID = "#e2ddce"

plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "font.size": 15,
    "text.color": INK, "axes.labelcolor": INK,
    "xtick.color": INK, "ytick.color": INK,
    "axes.edgecolor": GRID,
    "svg.fonttype": "none",
})

def style(ax):
    ax.set_facecolor(BG)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(GRID); ax.spines["bottom"].set_color(GRID)
    ax.tick_params(length=0)
    ax.set_axisbelow(True)
    ax.yaxis.grid(True, color=GRID, linewidth=1)

groups  = ["Ed'24", "Ed'25"]
md_vals = [18.1, 8.9]
fl_vals = [44.4, 45.7]

x = np.arange(len(groups)); w = 0.38
fig, ax = plt.subplots(figsize=(5.6, 3.9))
fig.patch.set_facecolor(BG); style(ax)
b1 = ax.bar(x - w/2, md_vals, w, label="νActionGUI", color=MD, zorder=3)
b2 = ax.bar(x + w/2, fl_vals, w, label="Flask", color=FL, zorder=3)
for bars, vals in ((b1, md_vals), (b2, fl_vals)):
    for r, v in zip(bars, vals):
        ax.text(r.get_x()+r.get_width()/2, v, "{:.1f}%".format(v),
                ha="center", va="bottom", fontsize=13, fontweight="bold", color=INK)
ax.set_xticks(x); ax.set_xticklabels(groups, fontweight="bold")
ax.set_ylabel("% of tests failed (avg)", fontsize=13, color=MUTE)
ax.set_title("Failed privacy tests (Development)", fontsize=16, fontweight="bold",
             color=INK, pad=12, loc="left")
ax.set_ylim(0, 56)
ax.legend(frameon=False, fontsize=13, loc="upper left", bbox_to_anchor=(0, 1.0),
          ncol=2, handlelength=1.1, columnspacing=1.2)
fig.tight_layout()
for ext in ("pdf", "svg"):
    fn = "plot_privacy." + ext
    fig.savefig(fn, facecolor=BG, bbox_inches="tight", pad_inches=0.12)
    print("wrote", fn)
plt.close(fig)
