import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CREATE } from '../../constants/APP';

export function ListHead({ pageName, handleCreate, backLink }) {
  const title = useMemo(
    () => backLink.slice(1).toUpperCase() || 'HOME',
    [backLink]
  );

  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt="2"
    >
      <Typography component="h2" variant="h4" color="text.primary" gutterBottom>
        {backLink && (
          <Link to={backLink} style={{ marginRight: 15 }} title={title}>
            <ArrowBackIcon />
          </Link>
        )}
        {pageName}
      </Typography>
      {handleCreate && (
        <Button variant="contained" onClick={handleCreate}>
          {CREATE}
        </Button>
      )}
    </Grid>
  );
}
