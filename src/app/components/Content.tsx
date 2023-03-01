export default function Content() {
  return (
    <div className="max-w-[936px] mx-auto overflow-hidden">
      <div className="shadow-md rounded-md overflow-hidden p-3 bg-white">
        {/* <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar> */}
      </div>
      <p className="my-5 mx-2 text-gray-500 text-center">
        Nothing to see here, just testing tailwind
      </p>
    </div>
  );
}
