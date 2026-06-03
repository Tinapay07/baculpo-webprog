import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import articles from "../../assets/article-content";

const makeInitialRows = () =>
  articles.map((article, index) => ({
    id: index + 1,
    slug: article.name,
    title: article.title,
    paragraphs: article.content.length,
    preview: article.summary,
    status: index % 2 === 0 ? "Published" : "Draft",
  }));

const emptyArticle = {
  slug: "",
  title: "",
  paragraphs: "1",
  preview: "",
  status: "Draft",
};

const truncate = (value, maxLength = 92) => {
  const text = String(value || "");
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const DashboardArticleListPage = () => {
  const [rows, setRows] = useState(makeInitialRows);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyArticle);

  const filteredRows = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return rows;
    }

    return rows.filter((row) =>
      [row.slug, row.title, row.preview, row.status].some((value) =>
        String(value).toLowerCase().includes(search),
      ),
    );
  }, [rows, searchTerm]);

  const visibleRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(emptyArticle);
    setOpenDialog(true);
  };

  const handleOpenEdit = (row) => {
    setEditingId(row.id);
    setFormData({
      slug: row.slug,
      title: row.title,
      paragraphs: String(row.paragraphs),
      preview: row.preview,
      status: row.status,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    setFormData(emptyArticle);
  };

  const handleFormChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSaveArticle = (event) => {
    event.preventDefault();

    const nextArticle = {
      slug: formData.slug.trim(),
      title: formData.title.trim(),
      paragraphs: Number(formData.paragraphs) || 1,
      preview: formData.preview.trim(),
      status: formData.status,
    };

    if (editingId) {
      setRows((current) =>
        current.map((row) =>
          row.id === editingId ? { ...row, ...nextArticle } : row,
        ),
      );
    } else {
      const nextId = rows.length
        ? Math.max(...rows.map((row) => Number(row.id) || 0)) + 1
        : 1;
      setRows((current) => [...current, { id: nextId, ...nextArticle }]);
    }

    handleCloseDialog();
  };

  const handleDeleteArticle = (id) => {
    setRows((current) => current.filter((row) => row.id !== id));
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" sx={{ color: "#111827", fontWeight: 700 }}>
          Articles
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage article entries shown on the public article list.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{ border: "1px solid #e5e7eb", p: 2, width: "100%" }}
      >
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
          >
            <TextField
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(0);
              }}
              placeholder="Search articles"
              size="small"
              sx={{ width: { xs: "100%", sm: 320 } }}
            />
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={handleOpenAdd}
            >
              Add Article
            </Button>
          </Stack>

          <TableContainer>
            <Table sx={{ minWidth: 980 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 70 }}>ID</TableCell>
                  <TableCell sx={{ width: 200 }}>Slug</TableCell>
                  <TableCell sx={{ width: 250 }}>Title</TableCell>
                  <TableCell align="right" sx={{ width: 120 }}>
                    Paragraphs
                  </TableCell>
                  <TableCell>Preview</TableCell>
                  <TableCell sx={{ width: 130 }}>Status</TableCell>
                  <TableCell sx={{ width: 160 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.slug}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell align="right">{row.paragraphs}</TableCell>
                    <TableCell>{truncate(row.preview)}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={
                          row.status === "Published" ? "success" : "warning"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleOpenEdit(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          onClick={() => handleDeleteArticle(row.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {visibleRows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                      sx={{ py: 8, color: "text.secondary" }}
                    >
                      No articles found.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredRows.length}
            page={page}
            onPageChange={(_event, nextPage) => setPage(nextPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(Number(event.target.value));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Stack>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editingId ? "Edit Article" : "Add Article"}</DialogTitle>
        <Box component="form" onSubmit={handleSaveArticle}>
          <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
            <TextField
              label="Slug"
              value={formData.slug}
              onChange={handleFormChange("slug")}
              required
              fullWidth
            />
            <TextField
              label="Title"
              value={formData.title}
              onChange={handleFormChange("title")}
              required
              fullWidth
            />
            <TextField
              label="Paragraphs"
              type="number"
              value={formData.paragraphs}
              onChange={handleFormChange("paragraphs")}
              required
              fullWidth
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Preview"
              value={formData.preview}
              onChange={handleFormChange("preview")}
              required
              fullWidth
              multiline
              minRows={3}
            />
            <TextField
              label="Status"
              select
              value={formData.status}
              onChange={handleFormChange("status")}
              fullWidth
            >
              <MenuItem value="Published">Published</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save Article
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
};

export default DashboardArticleListPage;
