{
    "targets": [
        {
            "target_name": "uuid",
            "sources": ["<!@(node scripts/sources.js)"],
            "cflags": ["-march=native"],
            "cflags_cc": ["-Xlinker", "-lc++"],
            "include_dirs": [
                "${workspaceRoot}",
            ],
        }
    ]
}
