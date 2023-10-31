import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

export function Info({ data = {}, isLoading, tiers }) {
  return (
    <Box mb={5}>
      {isLoading && <LinearProgress />}
      <Grid container sx={{ justifyContent: 'space-between' }}>
        {tiers.map((tier) => (
          // Enterprise card is full width at sm breakpoint
          <Grid item key={tier.title} sx={{ padding: '10px' }} md={3}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardHeader
                title={tier.title}
                avatar={tier.icon}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                  color: tier.color,
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '16px',
                }}
              >
                <Typography style={{ fontSize: '16px' }}>Total</Typography>
                <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {data[tier.key]}
                </Typography>
              </Box>

              <CardActions sx={{ padding: '16px' }}>
                {tier.path && (
                  <Link
                    to={tier.path}
                    style={{ display: 'block', width: '100%' }}
                  >
                    <Button fullWidth variant="outlined">
                      View
                    </Button>
                  </Link>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
