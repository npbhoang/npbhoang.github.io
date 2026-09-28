# Generates deck-styled result plots from the thesis (Ch. 9, Ed'24 & Ed'25).
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm

BG   = "#fbfaf7"   # deck background
MD   = "#215caf"   # model-driven (nuActionGUI / ActionGUI)  -> blue
FL   = "#c0392b"   # code-centric (Flask)                    -> red
INK  = "#1e2b45"
MUTE = "#8a8577"
GRID = "#e2ddce"

plt.rcParams.update({
    "font.family": "DejaVu Sans",
    "font.size": 15,
    "text.color": INK, "axes.labelcolor": INK,
    "xtick.color": INK, "ytick.color": INK,
    "axes.edgecolor": GRID,
})

def style(ax):
    ax.set_facecolor(BG)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.spines["left"].set_color(GRID); ax.spines["bottom"].set_color(GRID)
    ax.tick_params(length=0)
    ax.set_axisbelow(True)
    ax.yaxis.grid(True, color=GRID, linewidth=1)

def grouped(fname, groups, md_vals, fl_vals, title, ylabel, fmt="{:.1f}",
            ymax=None, figsize=(5.6, 3.9), md_label="νActionGUI", fl_label="Flask"):
    import numpy as np
    x = np.arange(len(groups)); w = 0.38
    fig, ax = plt.subplots(figsize=figsize, dpi=200)
    fig.patch.set_facecolor(BG); style(ax)
    b1 = ax.bar(x - w/2, md_vals, w, label=md_label, color=MD, zorder=3)
    b2 = ax.bar(x + w/2, fl_vals, w, label=fl_label, color=FL, zorder=3)
    for bars, vals in ((b1, md_vals), (b2, fl_vals)):
        for r, v in zip(bars, vals):
            ax.text(r.get_x()+r.get_width()/2, v, fmt.format(v),
                    ha="center", va="bottom", fontsize=13, fontweight="bold",
                    color=INK)
    ax.set_xticks(x); ax.set_xticklabels(groups, fontweight="bold")
    ax.set_ylabel(ylabel, fontsize=13, color=MUTE)
    ax.set_title(title, fontsize=16, fontweight="bold", color=INK, pad=12, loc="left")
    if ymax: ax.set_ylim(0, ymax)
    else:    ax.set_ylim(0, max(md_vals+fl_vals)*1.22)
    ax.legend(frameon=False, fontsize=13, loc="upper left",
              bbox_to_anchor=(0, 1.0), ncol=2, handlelength=1.1, columnspacing=1.2)
    fig.tight_layout()
    fig.savefig(fname, facecolor=BG, bbox_inches="tight", pad_inches=0.12)
    plt.close(fig)
    print("wrote", fname)

# --- Enrollment across 4 editions (highlight privacy editions Ed'24/25) ---
import numpy as np
def enrollment(fname):
    eds = ["Ed'22", "Ed'23", "Ed'24", "Ed'25"]
    vals = [99, 131, 81, 113]
    tools = ["ActionGUI", "ActionGUI", "νActionGUI", "νActionGUI"]
    colors = ["#b9b3a3", "#b9b3a3", MD, MD]
    fig, ax = plt.subplots(figsize=(6.4, 3.7), dpi=200)
    fig.patch.set_facecolor(BG); style(ax)
    bars = ax.bar(eds, vals, color=colors, width=0.62, zorder=3)
    for r, v in zip(bars, vals):
        ax.text(r.get_x()+r.get_width()/2, v+2.5, str(v), ha="center", va="bottom",
                fontsize=15, fontweight="bold", color=INK)
    ax.set_ylim(0, 158)
    ax.set_ylabel("students enrolled", fontsize=13, color=MUTE)
    # bracket over the privacy editions (Ed'24, Ed'25)
    ax.annotate("", xy=(2, 150), xytext=(3, 150),
                arrowprops=dict(arrowstyle="-", color=MD, lw=1.6))
    ax.annotate("privacy editions · νActionGUI", xy=(2.5, 152), fontsize=12,
                color=MD, fontweight="bold", ha="center", va="bottom")
    from matplotlib.patches import Patch
    ax.legend(handles=[Patch(color="#b9b3a3", label="ActionGUI"),
                       Patch(color=MD, label="νActionGUI")],
              frameon=False, fontsize=12.5, loc="upper left", ncol=2,
              handlelength=1.0, columnspacing=1.2)
    fig.tight_layout()
    fig.savefig(fname, facecolor=BG, bbox_inches="tight", pad_inches=0.12)
    plt.close(fig); print("wrote", fname)

enrollment("plot_enroll.png")

# --- Security correctness (RQ1): % failed security tests, nuAG vs Flask ---
grouped("plot_security.png", ["Development", "Evolution"],
        [4.7, 7.4], [14.4, 18.8],
        "Failed security tests", "% of tests failed (avg)", fmt="{:.1f}%", ymax=24)

# --- Privacy correctness (RQ3): % failed privacy tests by edition (Dev) ---
grouped("plot_privacy.png", ["Ed'24", "Ed'25"],
        [18.1, 8.9], [44.4, 45.7],
        "Failed privacy tests (Development)", "% of tests failed (avg)", fmt="{:.1f}%", ymax=56)

# --- Effort (RQ6): LoC per passed test, nuAG vs Flask ---
grouped("plot_effort.png", ["Development", "Evolution"],
        [0.13, 0.48], [0.68, 2.33],
        "Coding effort", "lines of code per passing test", fmt="{:.2f}", ymax=2.8)
print("done")
