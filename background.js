var backgrounds = ["linear-gradient(to right, #00c6ff, #0072ff)", "linear-gradient(to right, #00c9ff, #92fe9d)", "linear-gradient(to right, #70e1f5, #ffd194)",
                "linear-gradient(to right, #ffd89b, #19547b)", "linear-gradient(to right, #5433ff, #20bdff, #a5fecb)", "radial-gradient( circle farthest-corner at 10% 20%,  rgba(208,89,109,1) 0%, rgba(231,156,118,1) 90% )",
                "linear-gradient( 112.4deg,  rgba(176,174,225,1) 44.9%, rgba(135,197,235,1) 94.5% )", "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)", "linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)",
                "radial-gradient( circle farthest-corner at 10% 20%,  rgba(102,116,236,1) 0%, rgba(50,231,219,1) 90% )", "linear-gradient( 111.5deg, rgba(20,100,196,1) 0.4%, rgba(33,152,214,1) 100.2% )", "radial-gradient( circle farthest-corner at 1.3% 2.8%,  rgba(239,249,249,1) 0%, rgba(182,199,226,1) 100.2% )",
                "linear-gradient( 178.1deg,  rgba(246,199,34,1) 13%, rgba(245,149,33,1) 86.3% )"]

body.style.backgroundImage = backgrounds[Math.floor(Math.random() * (backgrounds.length))]
